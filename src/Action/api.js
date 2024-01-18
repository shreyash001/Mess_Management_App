import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import XLSX from 'xlsx';
import RNFetchBlob from 'rn-fetch-blob';
import { Alert, PermissionsAndroid } from 'react-native';

export const getAllUserDAta = async () => {
    let tempData = []
    await firestore()
        .collection('Users')
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                if (documentSnapshot.data().isUser === true) {
                    tempData.push({
                        id: documentSnapshot.id,
                        data: documentSnapshot.data(),
                    });
                    // console.log(documentSnapshot.data())
                }
            });
        })
    // console.log(tempData)
    return tempData;
}

export const userAttendence = async (date) => {

    let selectedDate = new Date(date);
    let tempUserData = [];

    let a1 = await firestore().collection('Attendence').doc(date).get().then(async (data) => {
        if (!data.exists) {
            // If attendance document doesn't exist, create one
            await firestore().collection('Attendence').doc(date).set({
                AtDate: date,
                delivered: false,
                attendence: []  // Initialize the attendance array if needed
            });
            userAttendence(date);
        } else {
            // Attendance document exists, fetch user data and compare
            const attendanceData = data.data().attendence;
            const usersSnapshot = await firestore().collection('Users').where('isUser', '==', true).get();

            if (attendanceData && Array.isArray(attendanceData) && attendanceData.length >= 1) {
                tempUserData = attendanceData;

                usersSnapshot.forEach(userDocument => {
                    const userId = userDocument.data()._id;
                    if (userDocument.data().planPurched.planDayRemaning > 0) {
                        let userStartDate = new Date(userDocument.data().planPurched.planStartDate)
                        // console.log(userDocument.data()._id)
                        if (selectedDate >= userStartDate) {
                            const userInAttendance = tempUserData.some(item => item.id === userId);
                            if (!userInAttendance) {
                                // User found in attendance data for the selected date
                                console.log(`User ${userId} ate on ${date}`);
                                tempUserData.push({
                                    id: userDocument.id,
                                    name: userDocument.data().name,
                                    lunch: false,
                                    dinner: false
                                })
                            }
                        }

                    }
                    // Check if any object in tempUserData has an id property equal to userId
                });
                await firestore().collection('Attendence').doc(date).update({
                    attendence: tempUserData
                })
            }
            else if (attendanceData.length < 1 || attendanceData === undefined) {
                // Attendance data is not an array or is undefined:
                usersSnapshot.forEach(userDocument => {
                    const userStartDate = new Date(userDocument.data().planPurched.planStartDate);
                    if (selectedDate >= userStartDate && userDocument.data().planPurched.planDayRemaning >= 1) {
                        tempUserData.push({
                            id: userDocument.id,
                            name: userDocument.data().name,
                            lunch: false,
                            dinner: false
                        });
                    }
                })

                await firestore().collection('Attendence').doc(date).update({
                    attendence: tempUserData
                })
            } else {
                console.warn('Attendence Data is not Correctly Read', attendanceData)
            }
        }
    }).catch(error => {
        console.error('Error:', error);
    });

    const leaveData = await getLeaveData(selectedDate.toDateString())
    if (leaveData !== undefined) {
        tempUserData.map(data => {
            let userIndex = leaveData.findIndex(user => user._id === data.id)
            if (userIndex != -1) {
                const leaveUser = leaveData[userIndex];
                if (leaveUser.lunchLeave) {
                    data.lunch = 'Leave'
                }
                if (leaveUser.dinnerLeave) {
                    data.dinner = 'Leave'
                }
            }
        })
    }
    // console.log(tempUserData)
    return tempUserData;
}

export const getDate = (dateInput) => {
    const date = new Date(dateInput)
    const options = {
        timeZone: 'Asia/Kolkata',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    const ISTDateString = date.toLocaleDateString('en-IN', options);
    return ISTDateString
}

export const getLeaveData = async (dateString) => {
    try {
        const data = await firestore().collection('Leave').doc(dateString).get()
        if (data?.data()?.leaveUsers != undefined) {
            return data.data().leaveUsers
        }
    } catch (error) {
        console.log('error in getting leave data')
    }

}

export const getUserLeaveData = async (userId) => {
    const date = new Date();
    let userleaveData = [];

    try {
        const usersSnapshot = await firestore().collection('Leave').doc(date.toDateString()).get();
        if (usersSnapshot.exists) {
            const leaveData = usersSnapshot.data().leaveUsers;

            leaveData.forEach(userDocument => {
                if (userDocument._id === userId) {
                    userleaveData = userDocument;
                }
            });
            return userleaveData
        } else {
            return false
        }

    } catch (error) {
        console.error('Error in getUserLeaveData:', error);
    }


};


//getting user startdate and reducing it as the day changes
export const updateUserData = async (userID: string) => {
    let userData = firestore().collection('Users').doc(userID)
    let data = await userData.get()
    let current = data.data().planPurched.planDayRemaning

    await userData.update({
        'planPurched.planDayRemaning': current - 1
    })
}

export const getOrderDetails = async () => {

    const date = new Date().toDateString()
    let tempData: { id: string; data: FirebaseFirestoreTypes.DocumentData; }[] = [];
    let leaveUsersData = await getLeaveData(date)
    // console.log(leaveUsersData)

    let orderData = {
        veg: 0,
        nonVeg: 0,
        combo: 0,
        leave: {
            lunch: {
                veg: 0,
                nonVeg: 0,
                combo: 0
            },
            dinner: {
                veg: 0,
                nonVeg: 0,
                combo: 0
            }
        }
    };

    await firestore()
        .collection('Users')
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                tempData.push({
                    id: documentSnapshot.id,
                    data: documentSnapshot.data(),
                });
            });
        }).then(() => {
            tempData.map((user, id) => {
                let userId = user.data._id;
                if (user.data.isUser && user.data.planPurched.planDayRemaning > 0) {
                    if (leaveUsersData != undefined && Array.isArray(leaveUsersData)) {
                        let userIndex = leaveUsersData.findIndex((leaveUser) => leaveUser._id === userId);
                        if (userIndex !== -1) {
                            if (leaveUsersData[userIndex].lunchLeave) {
                                if (user.data.planPurched.planName === "Veg Plan") {
                                    orderData.leave.lunch.veg += 1;
                                } else if (user.data.planPurched.planName === "Non-Veg Plan") {
                                    orderData.leave.lunch.nonVeg += 1;
                                } else if (user.data.planPurched.planName === "Combo Plan ( Veg + Non-Veg )") {
                                    orderData.leave.lunch.combo += 1;
                                }
                            } else if (leaveUsersData[userIndex].dinnerLeave) {
                                if (user.data.planPurched.planName === "Veg Plan") {
                                    orderData.leave.lunch.veg += 1;
                                } else if (user.data.planPurched.planName === "Non-Veg Plan") {
                                    orderData.leave.lunch.nonVeg += 1;
                                } else if (user.data.planPurched.planName === "Combo Plan ( Veg + Non-Veg )") {
                                    orderData.leave.lunch.combo += 1;
                                }
                            }
                        }
                    }
                    else {
                        if (user.data.planPurched.planName === "Veg Plan") {
                            orderData.veg += 1;
                        } else if (user.data.planPurched.planName === "Non-Veg Plan") {
                            orderData.nonVeg += 1;
                        } else if (user.data.planPurched.planName === "Combo Plan ( Veg + Non-Veg )") {
                            orderData.combo += 1;
                        }
                    }
                }
            });

        })


    return orderData;
}


export const getTotalAttendence = async () => {
    let currentDate = new Date();
    let startDateOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    let tempData: { date: any; user: { name: any; lunch: any; dinner: any; }[]; }[] = []

    const userDocument = await firestore().collection('Attendence').get();

    await Promise.all(userDocument.docs.map(async (doc) => {
        let userAttendence: { name: any; lunch: any; dinner: any; }[] = []
        let leaveData = await getLeaveData(doc.data().AtDate);

        doc.data().attendence.forEach(element => {
            if (leaveData !== undefined) {
                let userIndex = leaveData.findIndex(user => user._id === element.id);
                if (userIndex !== -1) {
                    userAttendence.push({
                        name: element.name,
                        lunch: leaveData[userIndex].lunchLeave ? 'Leave' : true,
                        dinner: leaveData[userIndex].dinnerLeave ? 'Leave' : true
                    });
                } else {
                    userAttendence.push({
                        name: element.name,
                        lunch: element.lunch,
                        dinner: element.dinner
                    });
                }
            } else {
                userAttendence.push({
                    name: element.name,
                    lunch: element.lunch,
                    dinner: element.dinner
                });
            }
        });

        tempData.push({
            date: doc.data().AtDate,
            user: userAttendence
        });
    }));

    tempData.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });

    // console.log(tempData);
    createExcelFile(tempData);
}

const requestStoragePermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'Storage Permission',
                message: 'App needs access to your storage to save Excel file.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
        console.error('Error requesting storage permission:', err);
        return false;
    }
};

const createExcelFile = async (tempData) => {
    try {
      // Request storage permission
      const hasPermission = await requestStoragePermission();
  
      if (!hasPermission) {
        console.error('Permission to write to storage denied.');
        return;
      }
  
      const workbook = XLSX.utils.book_new();
      const worksheetData = [];
  
      // Function to format the date
      const formattedDate = (entry) => {
        const atDate = new Date(entry.date);
        const day = atDate.getDate();
        const month = atDate.getMonth() + 1; // Add 1 to get a human-readable month
  
        // Use template literals to format the date with leading zeros
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
  
        return `${formattedDay}/${formattedMonth}`;
      };
  
      // Function to map values
      const mapValue = (value) => {
        switch (value) {
          case true:
            return '1';
          case false:
            return '0';
          case 'Leave':
            return 'L';
          default:
            return '';
        }
      };
  
      // Filter data for the last 30 days
      const last30DaysData = tempData.filter((entry) => {
        const entryDate = new Date(entry.date);
        const currentDate = new Date();
        const thirtyDaysAgo = new Date().setDate(currentDate.getDate() - 30);
        return entryDate >= thirtyDaysAgo && entryDate <= currentDate;
      });
  
      // Add header row with user names and dates
      const headerRow = ['User', 'Lunch', ...last30DaysData.map(formattedDate)];
      worksheetData.push(headerRow);
  
      // Create a map to store user data by user name
      const userDataMap = new Map();
  
      // Add data
      last30DaysData.forEach((entry) => {
        entry.user.forEach((user) => {
          // Create or get the user data array for this user name
          let userData = userDataMap.get(user.name) || Array(headerRow.length - 1).fill('');
  
          // Update user data with lunch and dinner values at the corresponding date columns
          const userIndex = headerRow.indexOf(formattedDate(entry));
          if (userIndex !== -1) {
            const lunch = mapValue(user.lunch);
            const dinner = mapValue(user.dinner);
  
            // Update user data with lunch and dinner values at the correct index
            userData[0] = user.name;
            userData[userIndex] = `${lunch}, ${dinner}`;
          }
  
          // Store the updated user data back in the map
          userDataMap.set(user.name, userData);
        });
      });
  
      // Add user data rows to the worksheet
      userDataMap.forEach((userData) => {
        worksheetData.push(userData);
      });
  
      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance Data');
  
      // Get the path to the Downloads directory
      const downloadsPath = RNFetchBlob.fs.dirs.DownloadDir;
  
      // Specify the file path
      const filePath = `${downloadsPath}/AttendanceData.xlsx`;
  
      // Convert data to base64
      const excelData = XLSX.write(workbook, { bookType: 'xlsx', type: 'base64' });
  
      // Write the file to the Downloads directory
      await RNFetchBlob.fs.writeFile(filePath, excelData, 'base64');
  
      console.log('Excel file created successfully. Path:', filePath);
      Alert.alert('Downloaded','File Saved In Downloads')
    } catch (error) {
      console.error('Error creating Excel file:', error);
      if (error.stack) {
        console.error(error.stack);
      }
    }
  };
  
  