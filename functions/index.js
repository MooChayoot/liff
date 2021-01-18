const functions = require('firebase-functions');
const admin = require('firebase-admin')
const line = require('@line/bot-sdk');
admin.initializeApp({
  credential: admin.credential.applicationDefault()
})
var db = admin.firestore()
const client = new line.Client({
  channelAccessToken: 'Ne84H48Z15T1D91rLqDV9u3vKo8fK1AOzbaxAhaY0X2EphDZX2mCHCEwNZdvPDNLlF2nb41V3kyVkbpVn7Eg9mVsza6syCqo+CPp3tE4aIuXKxse62lALTwPcSRmf+bEvwmE6Hzv24LH0vPzZVyW9wdB04t89/1O/w1cDnyilFU='
}); 
// let storageRef = admin.storage().ref();
const cors = require('cors')({
  origin: true
});
// res.json(querySnapshot.docs.length)
// .orderBy("index", "asc" && req.query. ).startAt((limit * page) - (limit - 1)).endAt(limit * page)
//37 pai // 7 trigger 
//---------------------------------All-Api-Display-------------------------------------\\
exports.displayprofile_lineid = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.query.lineid != "" && req.query.lineid ) {
      db.collection('member').where("lineid", "==", req.query.lineid).get()
        .then(function (querySnapshot) {
          if (querySnapshot.docs.length != 0) {
            querySnapshot.forEach(async function (doc) {
              res.status(200).json({
                id: doc.id,
                data: doc.data()
              })
            })
          } else {
            res.status(205).json({
              error: {
                "code": "205",
                "message": "การร้องขอได้ดำเนินการสำเร็จ แต่ไม่มีเนื้อหาใดๆ",
                "detail": "Reset Content"
              }
            })
          }
        })
    } else {
      res.status(400).json({
        error: {
          "code": "400",
          "message": "ค่า lineid เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
          "detail": "Bad Request"
        }
      })
    }
  })
})

exports.allowofuser = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.query.lineid != "" && req.query.lineid ) {
      let allow_wait = []
      let allow_complete = []
      await db.collection('leave_request').orderBy("createAt", "asc").get()
        .then(function (querySnapshot) {
          if (querySnapshot.docs.length != 0) {
            querySnapshot.forEach(async function (doc) {
              if(doc.data().lineid == req.query.lineid){
              if (doc.data().status == 0) {
                allow_wait.push({
                  id: doc.id,
                  data: doc.data()
                })
              } else {
                allow_complete.push({
                  id: doc.id,
                  data: doc.data()
                })
              }
            }
            })
          } else {
            res.status(205).json({
              error: {
                "code": "205",
                "message": "การร้องขอได้ดำเนินการสำเร็จ แต่ไม่มีเนื้อหาใดๆ",
                "detail": "Reset Content"
              }
            })
          }
        })
      res.status(200).json({
        allow_wait: allow_wait,
        allow_complete: allow_complete
      })
    } else {
      res.status(400).json({
        error: {
          "code": "400",
          "message": "ค่า lineid เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
          "detail": "Bad Request"
        }
      })
    }
  })
})

exports.allowofhr = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.query.company != "" && req.query.company ) {
      let allow_not = []
      let allow_complete = []
      await db.collection('leave_request').orderBy("createAt","asc").get()
        .then(function (querySnapshot) {
          // res.json(querySnapshot.docs.length )
          if (querySnapshot.docs.length != 0) {
            querySnapshot.forEach(async function (doc) {
              if (doc.data().status == 1 && doc.data().company == req.query.company) {
                allow_not.push({
                  id: doc.id,
                  data: doc.data()
                })
              }
              if (doc.data().status == 2 && doc.data().company == req.query.company) {
                allow_complete.push({
                  id: doc.id,
                  data: doc.data()
                })
              }
            })
          } else {
            res.status(205).json({
              error: {
                "code": "205",
                "message": "การร้องขอได้ดำเนินการสำเร็จ แต่ไม่มีเนื้อหาใดๆ",
                "detail": "Reset Content"
              }
            })
          }
        })
      res.status(200).json({
        allow_not: allow_not,
        allow_complete: allow_complete
      })
    } else {
      res.status(400).json({
        error: {
          "code": "400",
          "message": "ค่า company เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
          "detail": "Bad Request"
        }
      })
    }
  })
})

exports.showone_leave_request = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.query.id != "" && req.query.id ) {
      let id = req.query.id
      db.collection('leave_request').doc(id).get()
        .then(function (doc) {
          res.status(200).json({
            id: doc.id,
            data: doc.data()
          })
        })
    } else {
      res.status(400).json({
        error: {
          "code": "400",
          "message": "ค่า id ของ leave_requeset เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
          "detail": "Bad Request"
        }
      })
    }
  })
})

exports.company_chartsAll = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
        if (req.query.company != "" && req.query.company ) {
          let allow_complete = []
          let start = Number(req.query.dateStart)
          let end = Number(req.query.dateEnd)
          const leave = []
          let data = []
          await db.collection('leave').get().then(snapshot => {
            snapshot.forEach((doc) => {
              if (doc.data().leaveCompany == req.query.company) {
                leave.push(
                  doc.data().leaveType
                )
              }
            })
            return
          })
          await db.collection('leave_request').where("company","==",req.query.company).get()
            .then(function (querySnapshot) {
              if (querySnapshot.docs.length != 0) {
                querySnapshot.forEach(async function (doc) {
                    if (doc.data().status == 2) {
                      allow_complete.push(
                        {leaveType:doc.data().leaveType,leaveSum:doc.data().leaveSum}
                      )
                    }
                })
              } else {
                res.status(205).json({
                  error: {
                    "code": "205",
                    "message": "การร้องขอได้ดำเนินการสำเร็จ แต่ไม่มีเนื้อหาใดๆ(leave_request)",
                    "detail": "Reset Content"
                  }
                })
              }
            })
          for (let id = 0; id < leave.length; id++) {
            let sum = [0]
            for (let index = 0; index < allow_complete.length; index++) {
              if (leave[id] == allow_complete[index].leaveType) {
                let sumday = allow_complete[index].leaveSum + Number(sum[0])
                // res.json({lsum:allow_complete[index].leaveSum,sum:Number(sum[0])})
                sum.unshift(sumday)
              }
            }
            data.push({
              leaveType: leave[id],
              sum: sum[0]
            })
          }
          if (data.length != 0) {
            res.status(200).json({
              allow_complete: data
            })
          } else {
            res.status(205).json({
              error: {
                "code": "205",
                "message": "การร้องขอได้ดำเนินการสำเร็จ แต่ไม่มีเนื้อหาใดๆ(data = 0 )",
                "detail": "Reset Content"
              }
            })
          }
        } else {
          res.status(400).json({
            error: {
              "code": "400",
              "message": "ค่า company เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
              "detail": "Bad Request"
            }
          })
        }
  })
})

exports.company_chartsOne = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.query.company != "" && req.query.company ) {
        if (req.query.userid != "" && req.query.userid ) {
          let allow_complete = []
          let start = Number(req.query.dateStart)
          let end = Number(req.query.dateEnd)
          const leave = []
          let data = []
          await db.collection('leave').get().then(snapshot => {
            snapshot.forEach((doc) => {
              if (doc.data().leaveCompany == req.query.company) {
                leave.push(
                  doc.data().leaveType
                )
              }
            })
            return
          })
          await db.collection('leave_request').where("lineid","==",req.query.userid).get()
            .then(function (querySnapshot) {
              // res.json(querySnapshot.docs.length )
              if (querySnapshot.docs.length != 0) {
                querySnapshot.forEach(async function (doc) {
                  if (doc.data().status == 2 ) {
                    allow_complete.push(
                     { leaveType:doc.data().leaveType,leaveSum:doc.data().leaveSum}
                    )
                  }
                })
              } else {
                res.status(205).json({
                  error: {
                    "code": "205",
                    "message": "การร้องขอได้ดำเนินการสำเร็จ แต่ไม่มีเนื้อหาใดๆ",
                    "detail": "Reset Content"
                  }
                })
              }
            })
            for (let id = 0; id < leave.length; id++) {
              let sum = [0]
              for (let index = 0; index < allow_complete.length; index++) {
                if (leave[id] == allow_complete[index].leaveType) {
                  let sumday = allow_complete[index].leaveSum + Number(sum[0])
                  // res.json({lsum:allow_complete[index].leaveSum,sum:Number(sum[0])})
                  sum.unshift(sumday)
                }
              }
              data.push({
                leaveType: leave[id],
                sum: sum[0]
              })
            }
            if (data.length != 0) {
              res.status(200).json({
                allow_complete: data
              })
            } else {
              res.status(205).json({
                error: {
                  "code": "205",
                  "message": "การร้องขอได้ดำเนินการสำเร็จ แต่ไม่มีเนื้อหาใดๆ(data = 0 )",
                  "detail": "Reset Content"
                }
              })
            }
        } else {
          res.status(400).json({
            error: {
              "code": "400",
              "message": "ค่า userid เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
              "detail": "Bad Request"
            }
          })
        }
      } else {
        res.status(400).json({
          error: {
            "code": "400",
            "message": "ค่า company เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
            "detail": "Bad Request"
          }
        })
      }
  })
})

exports.company_chartsAll_OrderByDate = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.query.dateStart != "" && req.query.dateStart ) {
      if (req.query.dateEnd != "" && req.query.dateEnd ) {
        if (req.query.company != "" && req.query.company ) {
          let allow_complete = []
          let start = Number(req.query.dateStart)
          let end = Number(req.query.dateEnd)
          const leave = []
          let data = []
          await db.collection('leave').get().then(snapshot => {
            snapshot.forEach((doc) => {
              if (doc.data().leaveCompany == req.query.company) {
                leave.push(
                  doc.data().leaveType
                )
              }
            })
            return
          })
          await db.collection('leave_request').orderBy("dateStart", "asc").startAt(start).endAt(end).get()
            .then(function (querySnapshot) {
              if (querySnapshot.docs.length != 0) {
                querySnapshot.forEach(async function (doc) {
                  if (req.query.company == doc.data().company) {
                    if (doc.data().status == 2) {
                      allow_complete.push(
                        {leaveType:doc.data().leaveType,leaveSum:doc.data().leaveSum}
                      )
                    }
                  }
                })
              } else {
                res.status(205).json({
                  error: {
                    "code": "205",
                    "message": "การร้องขอได้ดำเนินการสำเร็จ แต่ไม่มีเนื้อหาใดๆ(leave_request)",
                    "detail": "Reset Content"
                  }
                })
              }
            })
          for (let id = 0; id < leave.length; id++) {
            let sum = [0]
            for (let index = 0; index < allow_complete.length; index++) {
              if (leave[id] == allow_complete[index].leaveType) {
                let sumday = allow_complete[index].leaveSum + Number(sum[0])
                // res.json({lsum:allow_complete[index].leaveSum,sum:Number(sum[0])})
                sum.unshift(sumday)
              }
            }
            data.push({
              leaveType: leave[id],
              sum: sum[0]
            })
          }
          if (data.length != 0) {
            res.status(200).json({
              allow_complete: data
            })
          } else {
            res.status(205).json({
              error: {
                "code": "205",
                "message": "การร้องขอได้ดำเนินการสำเร็จ แต่ไม่มีเนื้อหาใดๆ(data = 0 )",
                "detail": "Reset Content"
              }
            })
          }
        } else {
          res.status(400).json({
            error: {
              "code": "400",
              "message": "ค่า company เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
              "detail": "Bad Request"
            }
          })
        }
      } else {
        res.status(400).json({
          error: {
            "code": "400",
            "message": "ค่า dateEnd เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
            "detail": "Bad Request"
          }
        })
      }
    } else {
      res.status(400).json({
        error: {
          "code": "400",
          "message": "ค่า dateStart เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
          "detail": "Bad Request"
        }
      })
    }
  })
})

exports.company_chartsOne_OrderByDate = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.query.company != "" && req.query.company ) {
    if (req.query.dateStart != "" && req.query.dateStart ) {
      if (req.query.dateEnd != "" && req.query.dateEnd ) {
        if (req.query.userid != "" && req.query.userid ) {
          let allow_complete = []
          let start = Number(req.query.dateStart)
          let end = Number(req.query.dateEnd)
          const leave = []
          let data = []
          await db.collection('leave').get().then(snapshot => {
            snapshot.forEach((doc) => {
              if (doc.data().leaveCompany == req.query.company) {
                leave.push(
                  doc.data().leaveType
                )
              }
            })
            return
          })
          await db.collection('leave_request').orderBy("dateStart", "asc" ).startAt(start).endAt(end).get()
            .then(function (querySnapshot) {
              // res.json(querySnapshot.docs.length )
              if (querySnapshot.docs.length != 0) {
                querySnapshot.forEach(async function (doc) {
                  if (doc.data().status == 2 && doc.data().lineid == req.query.userid) {
                    allow_complete.push(
                     { leaveType:doc.data().leaveType,leaveSum:doc.data().leaveSum}
                    )
                  }
                })
              } else {
                res.status(205).json({
                  error: {
                    "code": "205",
                    "message": "การร้องขอได้ดำเนินการสำเร็จ แต่ไม่มีเนื้อหาใดๆ",
                    "detail": "Reset Content"
                  }
                })
              }
            })
            for (let id = 0; id < leave.length; id++) {
              let sum = [0]
              for (let index = 0; index < allow_complete.length; index++) {
                if (leave[id] == allow_complete[index].leaveType) {
                  let sumday = allow_complete[index].leaveSum + Number(sum[0])
                  // res.json({lsum:allow_complete[index].leaveSum,sum:Number(sum[0])})
                  sum.unshift(sumday)
                }
              }
              data.push({
                leaveType: leave[id],
                sum: sum[0]
              })
            }
            if (data.length != 0) {
              res.status(200).json({
                allow_complete: data
              })
            } else {
              res.status(205).json({
                error: {
                  "code": "205",
                  "message": "การร้องขอได้ดำเนินการสำเร็จ แต่ไม่มีเนื้อหาใดๆ(data = 0 )",
                  "detail": "Reset Content"
                }
              })
            }
        } else {
          res.status(400).json({
            error: {
              "code": "400",
              "message": "ค่า userid เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
              "detail": "Bad Request"
            }
          })
        }
      } else {
        res.status(400).json({
          error: {
            "code": "400",
            "message": "ค่า dateEnd เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
            "detail": "Bad Request"
          }
        })
      }
    } else {
      res.status(400).json({
        error: {
          "code": "400",
          "message": "ค่า dateStart เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
          "detail": "Bad Request"
        }
      })
    }
  } else {
    res.status(400).json({
      error: {
        "code": "400",
        "message": "ค่า company เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
        "detail": "Bad Request"
      }
    })
  }
  })
})

exports.user_All = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    let user = []
    if (req.query.company != "" && req.query.company ) {
      await db.collection('member').where("company", "==", req.query.company).get()
        .then(function (querySnapshot) {
          // res.json(querySnapshot.docs.length )
          if (querySnapshot.docs.length != 0) {
            querySnapshot.forEach(async function (doc) {
              user.push({
                id: doc.id,
                data: doc.data()
              })
            })
          } else {
            res.status(205).json({
              error: {
                "code": "205",
                "message": "การร้องขอได้ดำเนินการสำเร็จ แต่ไม่มีเนื้อหาใดๆ",
                "detail": "Reset Content"
              }
            })
          }
        })
      res.status(200).json({
        user: user
      })
    } else {
      res.status(400).json({
        error: {
          "code": "400",
          "message": "ค่า company เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
          "detail": "Bad Request"
        }
      })
    }
  })
})

exports.showuser = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    let user = []
    let admin = []
      await db.collection('member').orderBy("createAt","desc").get()
        .then(function (querySnapshot) {
          // res.json(querySnapshot.docs.length )
          if (querySnapshot.docs.length != 0) {
            querySnapshot.forEach(async function (doc) {
              if (doc.data().status == 1) {
                user.push({
                  id: doc.id,
                  data: doc.data()
                })
              }
              if (doc.data().status >= 2) {
                admin.push({
                  id: doc.id,
                  data: doc.data()
                })
              }
            })
          } else {
            res.status(205).json({
              error: {
                "code": "205",
                "message": "การร้องขอได้ดำเนินการสำเร็จ แต่ไม่มีเนื้อหาใดๆ",
                "detail": "Reset Content"
              }
            })
          }
        })
        res.status(200).json({
          user: user,
          admin: admin
        })
  })
})

exports.user_2tpye = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    let user = []
    let admin = []
    if (req.query.company != "" && req.query.company ) {
      await db.collection('member').where("company", "==", req.query.company).get()
        .then(function (querySnapshot) {
          if (querySnapshot.docs.length != 0) {
            querySnapshot.forEach(async function (doc) {
              if (doc.data().status == 1) {
                user.push({
                  id: doc.id,
                  data: doc.data()
                })
              }
              if (doc.data().status >= 2) {
                admin.push({
                  id: doc.id,
                  data: doc.data()
                })
              }
            })
          } else {
            res.status(205).json({
              error: {
                "code": "205",
                "message": "การร้องขอได้ดำเนินการสำเร็จ แต่ไม่มีเนื้อหาใดๆ",
                "detail": "Reset Content"
              }
            })
          }
        })
      res.status(200).json({
        user: user,
        admin: admin
      })
    } else {
      res.status(400).json({
        error: {
          "code": "400",
          "message": "ค่า company เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
          "detail": "Bad Request"
        }
      })
    }
  })
})

exports.company_All = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    let company = []
    await db.collection('company').get()
      .then(function (querySnapshot) {
        // res.json(querySnapshot.docs.length )
        if (querySnapshot.docs.length != 0) {
          querySnapshot.forEach(async function (doc) {
            company.push({
              id: doc.id,
              data: doc.data()
            })
          })
        } else {
          res.status(205).json({
            error: {
              "code": "205",
              "message": "การร้องขอได้ดำเนินการสำเร็จ แต่ไม่มีเนื้อหาใดๆ",
              "detail": "Reset Content"
            }
          })
        }
      })
    res.status(200).json({
      company: company
    })
  })
})

exports.company_One = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    let company = []
    let id = req.query.nameCompany
    if (req.query.nameCompany != "" && req.query.nameCompany ) {
      await db.collection('company').where("nameCompany","==", req.query.nameCompany).get()
        .then(function (querySnapshot) {
          if (querySnapshot.docs.length != 0) {
            querySnapshot.forEach(async function (doc) {
            company.push({
              id: doc.id,
              data: doc.data()
            })
          })
          } else {
            res.status(205).json({
              error: {
                "code": "205",
                "message": "การร้องขอได้ดำเนินการสำเร็จ แต่ไม่มีเนื้อหาใดๆ",
                "detail": "Reset Content"
              }
            })
          }
        })
      res.status(200).json({
        company: company
      })
    } else {
      res.status(400).json({
        error: {
          "code": "400",
          "message": "ค่า nameCompany เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
          "detail": "Bad Request"
        }
      })
    }
  })
})

exports.show_allowofcompany = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    let user = []
    if (req.query.company != "" && req.query.company ) {
      await db.collection('member').where("status", "==", 0).get()
        .then(function (querySnapshot) {
          if (querySnapshot.docs.length != 0) {
            querySnapshot.forEach(async function (doc) {
              if (doc.data().company == req.query.company) {
                user.push({
                  id: doc.id,
                  data: doc.data()
                })
              }
            })
          } else {
            res.status(205).json({
              error: {
                "code": "205",
                "message": "การร้องขอได้ดำเนินการสำเร็จ แต่ไม่มีเนื้อหาใดๆ",
                "detail": "Reset Content"
              }
            })
          }
        })
      res.status(200).json({
        user: user
      })
    } else {
      res.status(400).json({
        error: {
          "code": "400",
          "message": "ค่า company เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
          "detail": "Bad Request"
        }
      })
    }
  })
})

exports.show_allowofleave_request = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    let leave_request = []
    if (req.query.company != "" && req.query.company ) {
      await db.collection('leave_request').orderBy("createAt", "asc").get()
        .then(function (querySnapshot) {
          if (querySnapshot.docs.length != 0) {
            querySnapshot.forEach(async function (doc) {
              if (doc.data().company == req.query.company && doc.data().status == 0) {
                leave_request.push({
                  id: doc.id,
                  data: doc.data()
                })
              }
            })
          } else {
            res.status(205).json({
              error: {
                "code": "205",
                "message": "การร้องขอได้ดำเนินการสำเร็จ แต่ไม่มีเนื้อหาใดๆ",
                "detail": "Reset Content"
              }
            })
          }
        })
      res.status(200).json({
        leave_request: leave_request
      })
    } else {
      res.status(400).json({
        error: {
          "code": "400",
          "message": "ค่า company เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
          "detail": "Bad Request"
        }
      })
    }
  })
})

exports.show_leaveofcompany = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    let leave = []
    if (req.query.company != "" && req.query.company ) {
      await db.collection('leave').where("leaveCompany", "==", req.query.company).get()
        .then(function (querySnapshot) {
          if (querySnapshot.docs.length != 0) {
            querySnapshot.forEach(async function (doc) {
              leave.push({
                id: doc.id,
                data: doc.data()
              })
            })
          } else {
            res.status(205).json({
              error: {
                "code": "205",
                "message": "การร้องขอได้ดำเนินการสำเร็จ แต่ไม่มีเนื้อหาใดๆ",
                "detail": "Reset Content"
              }
            })
          }
        })
      res.status(200).json({
        leave: leave
      })
    } else {
      res.status(400).json({
        error: {
          "code": "400",
          "message": "ค่า company เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
          "detail": "Bad Request"
        }
      })
    }
  })
})

exports.show_positionofcompany = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    let position = []
    if (req.query.company != "" && req.query.company ) {
      await db.collection('position').where("positionCompany", "==", req.query.company).get()
        .then(function (querySnapshot) {
          if (querySnapshot.docs.length != 0) {
            querySnapshot.forEach(async function (doc) {
              position.push({
                id: doc.id,
                data: doc.data()
              })
            })
          } else {
            res.status(205).json({
              error: {
                "code": "205",
                "message": "การร้องขอได้ดำเนินการสำเร็จ แต่ไม่มีเนื้อหาใดๆ",
                "detail": "Reset Content"
              }
            })
          }
        })
      res.status(200).json({
        position: position
      })
    } else {
      res.status(400).json({
        error: {
          "code": "400",
          "message": "ค่า company เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
          "detail": "Bad Request"
        }
      })
    }
  })
})

exports.position_All = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    let positions = []
    await db.collection('position').get()
      .then(function (querySnapshot) {
        // res.json(querySnapshot.docs.length )
        if (querySnapshot.docs.length != 0) {
          querySnapshot.forEach(async function (doc) {
            positions.push({
              positionCompany: doc.data().positionCompany,
              positionType: doc.data().positionType
            })
          })
        } else {
          res.status(205).json({
            error: {
              "code": "205",
              "message": "การร้องขอได้ดำเนินการสำเร็จ แต่ไม่มีเนื้อหาใดๆ",
              "detail": "Reset Content"
            }
          })
        }
      })
    res.status(200).json({
      positions: positions
    })
  })
})

//--------------------------All-Api-Create-Update-Delete--------------------------------\\
exports.allowleave_request = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    let id = req.query.id
    let nameline =[]
    let allowstatus = Number(req.query.allowstatus)
    if (req.query.id != "" && req.query.id ) {
      if (req.query.allowstatus != "" && req.query.allowstatus ) {
        if (allowstatus == 1) {
          await db.collection('member').where("lineid", "==", req.query.lineid).get()
                    .then(snapshot => {
                      snapshot.forEach((doc) => {
                        let status = []
                        if(doc.data().status == 4){
                          status.push("Admin")
                        }
                        if(doc.data().status == 5){
                          status.push("Super Admin")
                        }
                        nameline.push({
                          name: doc.data().pname + doc.data().fname + " " + doc.data().lname,status:status[0]
                        })
                      })
                      return
                    })
          db.collection('leave_request').doc(id).get().then((doc) => {
            let sumday = doc.data().leaveSum
            let type = doc.data().leaveType
            db.collection('leave_request').doc(id).update({
              status: 1,noteAdmin: req.query.noteAdmin
            }).then(async () => {
              const userid = doc.data().lineid
              const name = []
              const adminP = []
              let root = []
              await db.collection('member').where("lineid", "==", userid).get()
                .then(snapshot => {
                  snapshot.forEach((doc) => {
                    name.push({
                      name: doc.data().pname + doc.data().fname + " " + doc.data().lname,
                      company: doc.data().company
                    })
                   let leave = []
                    for (let index = 0; index < doc.data().leave.length; index++) {
                      if (type == doc.data().leave[index].leaveType) {
                        let sum = sumday+doc.data().leave[index].leaveDay
                        leave.push({leaveType:doc.data().leave[index].leaveType,leaveDay:Number(sum)})
                      } else {
                        leave.push({leaveType:doc.data().leave[index].leaveType,leaveDay:doc.data().leave[index].leaveDay})
                      }
                    }
                    db.collection('member').doc(doc.id).update({
                      leave:leave
                    })
                  })
                  return
                })
              await db.collection('member').where('status', '>=', 4).get()
                .then(snapshot => {
                  if (snapshot.docs.length != 0) {
                    snapshot.forEach((doc) => {
                      if (doc.data().company == name[0].company) {
                        adminP.push(doc.data().lineid)
                      }
                    })
                    return
                  }
                })
              await db.collection('member').where('status', '==', 5).get()
                .then(snapshot => {
                  if (snapshot.docs.length != 0) {
                    snapshot.forEach((doc) => {
                      root.push(doc.data().lineid)
                    })
                    return
                  }
                })
                const messageme = {
                  type: 'text',
                  text: 'ผู้ดูแลระบบ "ไม่อนุมัติการลา"'
                };
                const messagemeroot = {
                  type: 'text',
                  text: 'ผู้จัดการระบบ "ไม่อนุมัติการลา"'
                };
              const messageadmin = {
                type: 'text',
                text: `${nameline[0].name}  (${nameline[0].status}) ไม่อนุมัติการลาของ ` + name[0].name
              };
              if (adminP.length != 0 || root.length != 0) {
                if (adminP.length == 0) {
                  client.pushMessage(userid, messagemeroot)
                    .then(() => {
                      client.multicast(root,
                          [messageadmin, ]
                        )
                        .then(() => {
                          res.status(200).json('success')
                        })
                        .catch((err) => {
                          res.json(err)
                        });
                    })
                    .catch((err) => {
                      res.json(err)
                    });
                } else {
                  client.pushMessage(userid, messageme)
                    .then(() => {
                      client.multicast(adminP,
                          [messageadmin, ]
                        )
                        .then(() => {
                          res.status(200).json('success')
                        })
                        .catch((err) => {
                          res.json(err)
                        });
                    })
                    .catch((err) => {
                      res.json(err)
                    });
                }
              }
            }).catch((err) => {
              res.json(err)
            })
          })
        } else {
          await db.collection('member').where("lineid", "==", req.query.lineid).get()
                    .then(snapshot => {
                      snapshot.forEach((doc) => {
                        let status = []
                        if(doc.data().status == 4){
                          status.push("Admin")
                        }
                        if(doc.data().status == 5){
                          status.push("Super Admin")
                        }
                        nameline.push({
                          name: doc.data().pname + doc.data().fname + " " + doc.data().lname,status:status[0]
                        })
                      })
                      return
                    })
          db.collection('leave_request').doc(id).get().then((doc) => {
            db.collection('leave_request').doc(id).update({
              status: 2
            }).then(async () => {
              const userid = doc.data().lineid
              const name = []
              const adminP = []
              let root = []
              await db.collection('member').where("lineid", "==", userid).get()
                .then(snapshot => {
                  snapshot.forEach((doc) => {
                    name.push({
                      name: doc.data().pname + doc.data().fname + " " + doc.data().lname,
                      company: doc.data().company
                    })
                  })
                  return
                })
              await db.collection('member').where('status', '>=', 4).get()
                .then(snapshot => {
                  if (snapshot.docs.length != 0) {
                    snapshot.forEach((doc) => {
                      if (doc.data().company == name[0].company) {
                        adminP.push(doc.data().lineid)
                      }
                    })
                    return
                  }
                })
              await db.collection('member').where('status', '==', 5).get()
                .then(snapshot => {
                  if (snapshot.docs.length != 0) {
                    snapshot.forEach((doc) => {
                      root.push(doc.data().lineid)
                    })
                    return
                  }
                })
              const messageme = {
                type: 'text',
                text: 'ผู้ดูแลระบบได้ "อนุมัติการลาเรียบร้อย"'
              };
              const messagemeroot = {
                type: 'text',
                text: 'ผู้จัดการระบบได้ "อนุมัติการลาเรียบร้อย"'
              };
              const messageadmin = {
                type: 'text',
                text: `${nameline[0].name}  (${nameline[0].status}) อนุมันติการลาของ ` + name[0].name
              };
              if (adminP.length != 0 || root.length != 0) {
                if (adminP.length == 0) {
                  client.pushMessage(userid, messagemeroot)
                    .then(() => {
                      client.multicast(root,
                          [messageadmin, ]
                        )
                        .then(() => {
                          res.status(200).json('success')
                        })
                        .catch((err) => {
                          res.json(err)
                        });
                    })
                    .catch((err) => {
                      res.json(err)
                    });
                } else {
                  client.pushMessage(userid, messageme)
                    .then(() => {
                      client.multicast(adminP,
                          [messageadmin, ]
                        )
                        .then(() => {
                          res.status(200).json('success')
                        })
                        .catch((err) => {
                          res.json(err)
                        });
                    })
                    .catch((err) => {
                      res.json(err)
                    });
                }
              }
            }).catch((err) => {
              res.json(err)
            })
          })
        }
      } else {
        res.status(400).json({
          error: {
            "code": "400",
            "message": "ค่า allowstatus เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
            "detail": "Bad Request"
          }
        })
      }
    } else {
      res.status(400).json({
        error: {
          "code": "400",
          "message": "ค่า id ของ leave_request เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
          "detail": "Bad Request"
        }
      })
    }
  })
})//

exports.allowlogin = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    let name = []
    if (req.query.userid != "" && req.query.userid ) {
      if (req.query.allowstatus != "" && req.query.allowstatus ) {
        let allowstatus = Number(req.query.allowstatus)
        if (allowstatus == 2) {
          
          await db.collection('member').where("lineid", "==", req.query.userid).get()
            .then(function (querySnapshot) {
              querySnapshot.forEach(async function (doc) {
                name.push({
                  name: doc.data().pname + doc.data().fname + " " + doc.data().lname,
                  company: doc.data().company
                })
                db.collection('member').doc(doc.id).update({
                  status: 1
                }).then(async () => {
                  const userid = req.query.userid
                  const userline = req.query.lineid
                  const adminP = []
                  const root = []
                  let nameline =[{name:"asd",status:"ad"}]
                  await db.collection('member').where("lineid", "==", userline).get()
                    .then(snapshot => {
                      snapshot.forEach((doc) => {
                        let status = []
                        if(doc.data().status == 4){
                          status.push("Admin")
                        }
                        if(doc.data().status == 5){
                          status.push("Super Admin")
                        }
                        nameline.unshift({
                          name: doc.data().pname + doc.data().fname + " " + doc.data().lname,status:status[0]
                        })
                      })
                      return
                    })
                  await db.collection('member').where('status', '>=', 4).get()
                    .then(snapshot => {
                      if (snapshot.docs.length != 0) {
                        snapshot.forEach((doc) => {
                          if (doc.data().company == name[0].company) {
                            adminP.push(doc.data().lineid)
                          }
                        })
                      }
                      return
                    })
                  await db.collection('member').where('status', '==', 5).get()
                    .then(snapshot => {
                      if (snapshot.docs.length != 0) {
                        snapshot.forEach((doc) => {
                          root.push(doc.data().lineid)
                        })
                      }
                      return
                    })
                  const messageme = {
                    type: 'text',
                    text: 'ผู้ดูแลระบบได้ "ยืนยันตัวตนสำเร็จ"'
                  };
                  const messagemeroot = {
                    type: 'text',
                    text: 'ผู้จัดการระบบได้ "ยืนยันตัวตนสำเร็จ"'
                  };
                  const messageadmin = {
                    type: 'text',
                    text: `${nameline[0].name}  (${nameline[0].status}) ยืนยันตัวตนของ ${name[0].name} ${doc.data().company} สำเร็จ`
                  };
                  if (adminP.length == 0) {
                    client.pushMessage(userid, messagemeroot)
                      .then(() => {
                        client.multicast(root,
                            [messageadmin, ]
                          )
                          .then(() => {
                            res.status(200).json('success')
                          })
                          .catch((err) => {
                            res.json(err)
                          });
                      })
                      .catch((err) => {
                        res.json(err)
                      });
                  } else {
                    client.pushMessage(userid, messageme)
                      .then(() => {
                        client.multicast(adminP,
                            [messageadmin, ]
                          )
                          .then(() => {
                            res.status(200).json('success')
                          })
                          .catch((err) => {
                            res.json(err)
                          });
                      })
                      .catch((err) => {
                        res.json(err)
                      });
                  }
                })
              })
            })
        } else {
          await db.collection('member').where("lineid", "==", req.query.userid).get()
            .then(function (querySnapshot) {
              querySnapshot.forEach(async function (doc) {
                name.push({
                  name: doc.data().pname + doc.data().fname + " " + doc.data().lname,
                  company: doc.data().company
                })
                let sumstatus = 0 - 1
                let sumstatusfiail = doc.data().statusfail - 1
                let balance = 3 + sumstatusfiail
                db.collection('member').doc(doc.id).update({
                  status: sumstatus,
                  statusfail: sumstatusfiail
                }).then(async () => {
                  
                  const userline = req.query.lineid
                  let nameline =[{name:"asd",status:"ad"}]
                  await db.collection('member').where("lineid", "==", userline).get()
                    .then(snapshot => {
                      snapshot.forEach((doc) => {
                        let status = []
                        if(doc.data().status == 4){
                          status.push("Admin")
                        }
                        if(doc.data().status == 5){
                          status.push("Super Admin")
                        }
                        nameline.unshift({
                          name: doc.data().pname + doc.data().fname + " " + doc.data().lname,status:status[0]
                        })
                      })
                      return
                    })
                  if (balance != 0) {
                    const userid = req.query.userid
                    const name = []
                    const adminP = []
                    const root = []
                    await db.collection('member').where("lineid", "==", userid).get()
                      .then(snapshot => {
                        snapshot.forEach((doc) => {
                          name.push({
                            name: doc.data().pname + doc.data().fname + " " + doc.data().lname,
                            company: doc.data().company
                          })
                        })
                        return
                      })
                    await db.collection('member').where('status', '>=', 4).get()
                      .then(snapshot => {
                        if (snapshot.docs.length != 0) {
                          snapshot.forEach((doc) => {
                            if (doc.data().company == name[0].company) {
                              adminP.push(doc.data().lineid)
                            }
                          })
                        }
                        return
                      })
                    await db.collection('member').where('status', '==', 5).get()
                      .then(snapshot => {
                        if (snapshot.docs.length != 0) {
                          snapshot.forEach((doc) => {
                            root.push(doc.data().lineid)
                          })
                        }
                        return
                      })
                    const messageme = {
                      type: 'text',
                      text: 'คำขอยืนยันตัวตนของคุณถูกปฏิเสธ สามารถยืนยันตัวตนใหม่ได้อีก ' + balance + 'ครั้ง'
                    };
                    const messageadmin = {
                      type: 'text',
                      text: `${nameline[0].name}  (${nameline[0].status}) ไม่อนุมัติการยืนยันตัวตนของ ${name[0].name} ${doc.data().company}`
                    };
                    if (adminP.length == 0) {
                      client.pushMessage(userid, messageme)
                        .then(() => {
                          client.multicast(root,
                              [messageadmin, ]
                            )
                            .then(() => {
                              res.status(200).json('success')
                            })
                            .catch((err) => {
                              res.json(err)
                            });
                        })
                        .catch((err) => {
                          res.json(err)
                        });
                    } else {
                      client.pushMessage(userid, messageme)
                        .then(() => {
                          client.multicast(adminP,
                              [messageadmin, ]
                            )
                            .then(() => {
                              res.status(200).json('success')
                            })
                            .catch((err) => {
                              res.json(err)
                            });
                        })
                        .catch((err) => {
                          res.json(err)
                        });
                    }
                  } else {
                    const userid = req.query.userid
                    const name = []
                    const adminP = []
                    const root = []
                    const userline = req.query.lineid
                    let nameline =[{name:"asd",status:"ad"}]
                  await db.collection('member').where("lineid", "==", userline).get()
                    .then(snapshot => {
                      snapshot.forEach((doc) => {
                        let status = []
                        if(doc.data().status == 4){
                          status.push("Admin")
                        }
                        if(doc.data().status == 5){
                          status.push("Super Admin")
                        }
                        nameline.unshift({
                          name: doc.data().pname + doc.data().fname + " " + doc.data().lname,status:status[0]
                        })
                      })
                      return
                    })
                    await db.collection('member').where("lineid", "==", userid).get()
                      .then(snapshot => {
                        snapshot.forEach((doc) => {
                          name.push({
                            name: doc.data().pname + doc.data().fname + " " + doc.data().lname,
                            company: doc.data().company
                          })
                        })
                        return
                      })
                    await db.collection('member').where('status', '>=', 4).get()
                      .then(snapshot => {
                        if (snapshot.docs.length != 0) {
                          snapshot.forEach((doc) => {
                            if (doc.data().company == name[0].company) {
                              adminP.push(doc.data().lineid)
                            }
                          })
                        }
                        return
                      })
                    await db.collection('member').where('status', '==', 5).get()
                      .then(snapshot => {
                        if (snapshot.docs.length != 0) {
                          snapshot.forEach((doc) => {
                            root.push(doc.data().lineid)
                          })
                        }
                        return
                      })
                    const messageme = {
                      type: 'text',
                      text: 'คุณไม่ได้รับอนุมัติให้เข้าสู่ระบบ และไม่สามารถยืนยันตัวตนได้อีก กรุณาติดต่อผู้ดูแลระบบ'
                    };
                    const messageadmin = {
                      type: 'text',
                      text: `${nameline[0].name}  (${nameline[0].status}) ไม่อนุมัติให้ ${name[0].name} ${doc.data().company} เข้าใช้งานระบบและยืนยันตัวตนได้อีก`
                    };
                    if (adminP.length == 0) {
                      client.pushMessage(userid, messageme)
                        .then(() => {
                          client.multicast(root,
                              [messageadmin, ]
                            )
                            .then(() => {
                              res.status(200).json('success')
                            })
                            .catch((err) => {
                              res.json(err)
                            });
                        })
                        .catch((err) => {
                          res.json(err)
                        });
                    } else {
                      client.pushMessage(userid, messageme)
                        .then(() => {
                          client.multicast(adminP,
                              [messageadmin, ]
                            )
                            .then(() => {
                              res.status(200).json('success')
                            })
                            .catch((err) => {
                              res.json(err)
                            });
                        })
                        .catch((err) => {
                          res.json(err)
                        });
                    }
                  }
                })
              })
            })
        }
      } else {
        res.status(400).json({
          error: {
            "code": "400",
            "message": "ค่า allowstatus เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
            "detail": "Bad Request"
          }
        })
      }
    } else {
      res.status(400).json({
        error: {
          "code": "400",
          "message": "ค่า userid เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
          "detail": "Bad Request"
        }
      })
    }
  })
})//

exports.delete_leave = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    let del = []
    let result = JSON.parse(req.query.data)
    if (req.query.datashow != "" && req.query.datashow ) {
    if (req.query.lineid != "" && req.query.lineid ) {
      if (req.query.data != "" && req.query.data ) {
        if (req.query.leaveCompany != "" && req.query.leaveCompany ) {
          await db.collection('leave').where("leaveCompany", "==", req.query.leaveCompany).get()
            .then(snapshot => {
              snapshot.forEach(function (doc) {
                for (let index = 0; index < result.length; index++) {
                  if (doc.data().leaveType == result[index]) {
                    del.push({
                      id: doc.id
                    })
                  }
                }
              })
            })
          for (let index = 0; index < del.length; index++) {
            db.collection("leave").doc(del[index].id).delete().then(async function () {
              let position = del.length - 1
              if (index == position) {
                const userid = req.query.lineid
                  const name = []
                  const adminP = []
                  const root = []
                await db.collection('member').where("lineid", "==", userid).get()
                    .then(snapshot => {
                      snapshot.forEach((doc) => {
                        let status = []
                        if(doc.data().status == 4){
                          status.push("Admin")
                        }
                        if(doc.data().status == 5){
                          status.push("Super Admin")
                        }
                        name.push({
                          name: doc.data().pname + doc.data().fname + " " + doc.data().lname,status:status[0]
                        })
                      })
                      return
                    })
                  await db.collection('member').where('status', '>=', 4).get()
                    .then(snapshot => {
                      if (snapshot.docs.length != 0) {
                        snapshot.forEach((doc) => {
                          if (doc.data().company == req.query.leaveCompany && doc.data().lineid != req.query.lineid) {
                            adminP.push(doc.data().lineid)
                          }
                        })
                      }
                      return
                    })
                  await db.collection('member').where('status', '==', 5).get()
                    .then(snapshot => {
                      if (snapshot.docs.length != 0) {
                        snapshot.forEach((doc) => {
                          if(doc.data().lineid != req.query.lineid){
                          root.push(doc.data().lineid)
                          }
                        })
                      }
                      return
                    })
                  const messageme = {
                    type: 'text',
                    text: `${name[0].name} (${name[0].status}) ได้ดำเนินการลบประเภทการลา ${req.query.datashow}`
                  };

                  if (adminP.length == 0) {
                    client.pushMessage(userid, messageme)
                      .then(() => {
                        client.multicast(root,
                            [messageme, ]
                          )
                          .then(() => {
                            res.status(200).json('success')
                          })
                          .catch((err) => {
                            res.json(err)
                          });
                      })
                      .catch((err) => {
                        res.json(err)
                      });
                  } else {
                    client.pushMessage(userid, messageme)
                      .then(() => {
                        client.multicast(adminP,
                            [messageme, ]
                          )
                          .then(() => {
                            res.status(200).json('success')
                          })
                          .catch((err) => {
                            res.json(err)
                          });
                      })
                      .catch((err) => {
                        res.json(err)
                      });
                  }
              }
            }).catch(function (error) {
              res.json("Error removing document: ", error);
            })
          }
        } else {
          res.status(400).json({
            error: {
              "code": "400",
              "message": "ค่า leaveCompany เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
              "detail": "Bad Request"
            }
          })
        }
      } else {
        res.status(400).json({
          error: {
            "code": "400",
            "message": "ค่า data เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
            "detail": "Bad Request"
          }
        })
      }
    } else {
      res.status(400).json({
        error: {
          "code": "400",
          "message": "ค่า lineid เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
          "detail": "Bad Request"
        }
      })
    }
  } else {
    res.status(400).json({
      error: {
        "code": "400",
        "message": "ค่า datashow เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
        "detail": "Bad Request"
      }
    })
  }
  })
}) //

exports.deleteleave = functions.firestore.document('leave/{userid}').onDelete(async (change, context) => {
  await db.collection('member').where("company", "==", change.data().leaveCompany).get()
    .then(snapshot => {
      snapshot.forEach(function (doc) {
        let dataleave = []
        let i = doc.data().leave.length
        for (let index = 0; index < i; index++) {
          if (doc.data().leave[index].leaveType != change.data().leaveType) {
            dataleave.push(doc.data().leave[index])
          }
        }
        db.collection('member').doc(doc.id).update({
          leave: dataleave
        });
      })
    })
});

exports.changeleave = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    let leave = []
    if (req.query.leaveCompany != "" && req.query.leaveCompany ) {
      if (req.query.leaveType != "" && req.query.leaveType ) {
        if (req.query.leaveDay != "" && req.query.leaveDay ) {
          if (req.query.lineid != "" && req.query.lineid ) {
            if (req.query.id != "" && req.query.id ) {
                    db.collection('leave').doc(req.query.id).update({
                      leaveType: req.query.leaveType,
                      leaveDay: Number(req.query.leaveDay),
                      leaveCompany: req.query.leaveCompany
                    }).then(async () => {
                      const userid = req.query.lineid
                      const name = []
                      const adminP = []
                      const root = []
                    await db.collection('member').where("lineid", "==", userid).get()
                        .then(snapshot => {
                          snapshot.forEach((doc) => {
                            let status = []
                            if(doc.data().status == 4){
                              status.push("Admin")
                            }
                            if(doc.data().status == 5){
                              status.push("Super Admin")
                            }
                            name.push({
                              name: doc.data().pname + doc.data().fname + " " + doc.data().lname,status:status[0]
                            })
                          })
                          return
                        })
                      await db.collection('member').where('status', '>=', 4).get()
                        .then(snapshot => {
                          if (snapshot.docs.length != 0) {
                            snapshot.forEach((doc) => {
                              if (doc.data().company == req.query.leaveCompany && doc.data().lineid != req.query.lineid) {
                                adminP.push(doc.data().lineid)
                              }
                            })
                          }
                          return
                        })
                      await db.collection('member').where('status', '==', 5).get()
                        .then(snapshot => {
                          if (snapshot.docs.length != 0) {
                            snapshot.forEach((doc) => {
                              if(doc.data().lineid != req.query.lineid){
                              root.push(doc.data().lineid)
                              }
                            })
                          }
                          return
                        })
                      const messageme = {
                        type: 'text',
                        text: `${name[0].name} (${name[0].status}) ได้ดำเนินการแก้ไขประเภทการลา ${req.query.leaveType}`
                      };
    
                      if (adminP.length == 0) {
                        client.pushMessage(userid, messageme)
                          .then(() => {
                            client.multicast(root,
                                [messageme, ]
                              )
                              .then(() => {
                                res.status(200).json('success')
                              })
                              .catch((err) => {
                                res.json(err)
                              });
                          })
                          .catch((err) => {
                            res.json(err)
                          });
                      } else {
                        client.pushMessage(userid, messageme)
                          .then(() => {
                            client.multicast(adminP,
                                [messageme, ]
                              )
                              .then(() => {
                                res.status(200).json('success')
                              })
                              .catch((err) => {
                                res.json(err)
                              });
                          })
                          .catch((err) => {
                            res.json(err)
                          });
                      }
                    }).catch((err) => {
                      res.json('error ' + err)
                    })
                  } else {
                    res.status(400).json({
                      error: {
                        "code": "400",
                        "message": "ค่า id ของ leave เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
                        "detail": "Bad Request"
                      }
                    })
                  }
                  } else {
                    res.status(400).json({
                      error: {
                        "code": "400",
                        "message": "ค่า lineid เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
                        "detail": "Bad Request"
                      }
                    })
                  }
        } else {
          res.status(400).json({
            error: {
              "code": "400",
              "message": "ค่า leaveDay เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
              "detail": "Bad Request"
            }
          })
        }
      } else {
        res.status(400).json({
          error: {
            "code": "400",
            "message": "ค่า leaveType เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
            "detail": "Bad Request"
          }
        })
      }
    } else {
      res.status(400).json({
        error: {
          "code": "400",
          "message": "ค่า leaveCompany เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
          "detail": "Bad Request"
        }
      })
    }
  })
}) //

exports.editleave = functions.firestore.document('leave/{userid}').onUpdate(async (change, context) => {
  let beforeName = change.before.data().leaveType
  let beforeDay = change.before.data().leaveDay
  let afterName = change.after.data().leaveType
  let afterDay = change.after.data().leaveDay
  let sunday = Number(beforeDay) - Number(afterDay)
  let company = change.before.data().leaveCompany
  await  db.collection('member').where("company","==",company).get().then((snapshot)=>{
    if (snapshot.docs.length > 0) {
      snapshot.forEach(async function (doc) {
        let leave = []
        for (let index = 0; index < doc.data().leave.length; index++) {
          if (doc.data().leave[index].leaveType == beforeName) {
            let sumday = Number(doc.data().leave[index].leaveDay) - Number(sunday)
            if(Number(sumday) < 0 ){
              leave.push({leaveType:afterName,leaveDay:0})
            }else{
              leave.push({leaveType:afterName,leaveDay:Number(sumday)})
            }
          }else{
            leave.push({leaveType:doc.data().leave[index].leaveType,leaveDay:Number(doc.data().leave[index].leaveDay)})
          }
        }
        db.collection('member').doc(doc.id).update({
          leave: leave,
        }).then(() => {        
        }).catch((err)=>console.log("error :",err,doc.id)
        )
      })
    }
  })
  
})

exports.addleave = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.query.leaveType != "" && req.query.leaveType ) {
      if (req.query.leaveDay != "" && req.query.leaveDay ) {
        if (req.query.leaveCompany != "" && req.query.leaveCompany ) {
          db.collection("leave").add({
              leaveType: req.query.leaveType,
              leaveDay: Number(req.query.leaveDay),
              leaveCompany: req.query.leaveCompany,
            })
            .then(function () {
              let sum = []
              db.collection('member').where("company", "==", req.query.leaveCompany).get()
                .then(async(snapshot) => {
                  if (snapshot.docs.length != 0) {
                    snapshot.forEach(function (doc) {
                      let dataleave = [{
                        leaveType: req.query.leaveType,
                        leaveDay: Number(req.query.leaveDay)
                      }]
                      let i = doc.data().leave.length
                      for (let index = 0; index < i; index++) {
                        dataleave.push(doc.data().leave[index])
                      }
                      db.collection('member').doc(doc.id).update({
                        leave: dataleave
                      }).then(async () => {
                        await sum.unshift("0" )
                        if (snapshot.docs.length == sum.length) {
                          const userid = req.query.lineid
                  const name = []
                  const adminP = []
                  const root = []
                await db.collection('member').where("lineid", "==", userid).get()
                    .then(snapshot => {
                      snapshot.forEach((doc) => {
                        let status = []
                        if(doc.data().status == 4){
                          status.push("Admin")
                        }
                        if(doc.data().status == 5){
                          status.push("Super Admin")
                        }
                        name.push({
                          name: doc.data().pname + doc.data().fname + " " + doc.data().lname,status:status[0]
                        })
                      })
                      return
                    })
                  await db.collection('member').where('status', '>=', 4).get()
                    .then(snapshot => {
                      if (snapshot.docs.length != 0) {
                        snapshot.forEach((doc) => {
                          if (doc.data().company == req.query.leaveCompany && doc.data().lineid != userid) {
                            adminP.push(doc.data().lineid)
                          }
                        })
                      }
                      return
                    })
                  await db.collection('member').where('status', '==', 5).get()
                    .then(snapshot => {
                      if (snapshot.docs.length != 0) {
                        snapshot.forEach((doc) => {
                          if(doc.data().lineid != userid){
                          root.push(doc.data().lineid)
                          }
                        })
                      }
                      return
                    })
                  const messageme = {
                    type: 'text',
                    text: `${name[0].name} (${name[0].status}) ได้ดำเนินการเพิ่มประเภทการลา ${req.query.leaveType}`
                  };

                  if (adminP.length == 0) {
                    client.pushMessage(userid, messageme)
                      .then(() => {
                        client.multicast(root,
                            [messageme, ]
                          )
                          .then(() => {
                            res.status(200).json('success')
                          })
                          .catch((err) => {
                            res.json(err)
                          });
                      })
                      .catch((err) => {
                        res.json(err)
                      });
                  } else {
                    client.pushMessage(userid, messageme)
                      .then(() => {
                        client.multicast(adminP,
                            [messageme, ]
                          )
                          .then(() => {
                            res.status(200).json('success')
                          })
                          .catch((err) => {
                            res.json(err)
                          });
                      })
                      .catch((err) => {
                        res.json(err)
                      });
                  }
                        }
                      }).catch((err) => {
                        res.json('error ' + err)
                      })
                    })
                  } else {
                    const userid = req.query.lineid
                    const name = []
                    const root = []
                  await db.collection('member').where("lineid", "==", userid).get()
                      .then(snapshot => {
                        snapshot.forEach((doc) => {
                          let status = []
                          if(doc.data().status == 4){
                            status.push("Admin")
                          }
                          if(doc.data().status == 5){
                            status.push("Super Admin")
                          }
                          name.push({
                            name: doc.data().pname + doc.data().fname + " " + doc.data().lname,status:status[0]
                          })
                        })
                        return
                      })
                      await db.collection('member').where('status', '==', 5).get()
                    .then(snapshot => {
                      if (snapshot.docs.length != 0) {
                        snapshot.forEach((doc) => {
                          if(doc.data().lineid != req.query.lineid){
                          root.push(doc.data().lineid)
                          }
                        })
                      }
                      return
                    })
                    const messageme = {
                      type: 'text',
                      text: `${name[0].name} (${name[0].status}) ได้ดำเนินการเพิ่มประเภทการลา ${req.query.leaveType}`
                    };
                    client.pushMessage(userid, messageme)
                      .then(() => {
                        client.multicast(root,
                            [messageme, ]
                          )
                          .then(() => {
                            res.status(200).json('success')
                          })
                          .catch((err) => {
                            res.json(err)
                          });
                      })
                      .catch((err) => {
                        res.json(err)
                      });
                  }
                })
            })
        } else {
          res.status(400).json({
            error: {
              "code": "400",
              "message": "ค่า leaveCompany เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
              "detail": "Bad Request"
            }
          })
        }
      } else {
        res.status(400).json({
          error: {
            "code": "400",
            "message": "ค่า leaveDay เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
            "detail": "Bad Request"
          }
        })
      }
    } else {
      res.status(400).json({
        error: {
          "code": "400",
          "message": "ค่า leaveType เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
          "detail": "Bad Request"
        }
      })
    }
  })
}) //

exports.updateLeave_of_year = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    let leave = []
    if (req.query.lineid != "" && req.query.lineid ) {
      if (req.query.year != "" && req.query.year ) {
        if (req.query.company != "" && req.query.company ) {
        await db.collection('leave').where("leaveCompany","==",req.query.company).get().then(snapshot => {
          snapshot.forEach((doc) => {
              leave.push({
                leaveType: doc.data().leaveType,
                leaveDay: doc.data().leaveDay
              })
          })
          return
        })
        
        await db.collection('member').where("lineid", "==", req.query.lineid).get()
            .then(function (querySnapshot) {
              querySnapshot.forEach(async function (doc) {
                db.collection('member').doc(doc.id).update({
                  year: Number(req.query.year),
                  leave: leave
                }).then(async () => {
                  res.status(200).json("success")
                }).catch((err)=>{
                  res.json("error update :"+err)
                })
              })
            }).catch((err)=>{
              res.json("error selete member :"+err)
            })
        
          } else {
            res.status(400).json({
              error: {
                "code": "400",
                "message": "ค่า company เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
                "detail": "Bad Request"
              }
            })
          }
        } else {
          res.status(400).json({
            error: {
              "code": "400",
              "message": "ค่า year เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
              "detail": "Bad Request"
            }
          })
        }
    } else {
      res.status(400).json({
        error: {
          "code": "400",
          "message": "ค่า lineid เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
          "detail": "Bad Request"
        }
      })
    }
  })
})

exports.seadmessage = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.query.lineid != "" && req.query.lineid ) {
      if (req.query.leaveType != "" && req.query.leaveType ) {
                      const userid = req.query.lineid
                      const name = []
                      const adminP = []
                      let root = []
                      await db.collection('member').where("lineid", "==", userid).get()
                        .then(snapshot => {
                          snapshot.forEach((doc) => {
                            name.push({
                              name: doc.data().pname + doc.data().fname + " " + doc.data().lname,
                              company: doc.data().company
                            })
                          })
                          return
                        })
                      await db.collection('member').where('status', '>=', 4).get()
                        .then(snapshot => {
                          if (snapshot.docs.length != 0) {
                            snapshot.forEach((doc) => {
                              if (doc.data().company == name[0].company) {
                                adminP.push(doc.data().lineid)
                              }
                            })
                            return
                          }
                        })
                      await db.collection('member').where('status', '==', 5).get()
                        .then(snapshot => {
                          if (snapshot.docs.length != 0) {
                            snapshot.forEach((doc) => {
                              root.push(doc.data().lineid)
                            })
                            return
                          }
                        })
                      const messageme = {
                        type: 'text',
                        text: 'ส่งข้อความถึง ผู้ดูแลระบบเสร็จสิ้น'
                      };
                      const messageadmin = {
                        type: 'text',
                        text: name[0].name + ` ได้ส่งข้อความบอกว่า เจ้านายจ๋าวันลา (${req.query.leaveType}) ไม่พอ`
                      };
                      if (adminP.length != 0 || root.length != 0) {
                        if (adminP.length == 0) {
                          client.pushMessage(userid, messageme)
                            .then(() => {
                              client.multicast(root,
                                  [messageadmin, ]
                                )
                                .then(() => {
                                  res.status(200).json('success')
                                })
                                .catch((err) => {
                                  res.json(err)
                                });
                            })
                            .catch((err) => {
                              res.json(err)
                            });
                        } else {
                          client.pushMessage(userid, messageme)
                            .then(() => {
                              client.multicast(adminP,
                                  [messageadmin, ]
                                )
                                .then(() => {
                                  res.status(200).json('success')
                                })
                                .catch((err) => {
                                  res.json(err)
                                });
                            })
                            .catch((err) => {
                              res.json(err)
                            });
                        }
                      } else {
                        const messageme = {
                          type: 'text',
                          text: 'ส่งข้อความถึง ผู้ดูแลระบบเสร็จสิ้น'
                        };
                        client.pushMessage(userid, messageme)
                          .then(() => {
                            res.status(200).json('success')
                          })
                          .catch((err) => {
                            res.json(err)
                          });
                      }
                    } else {
                      res.status(400).json({
                        error: {
                          "code": "400",
                          "message": "ค่า leaveType เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
                          "detail": "Bad Request"
                        }
                      })
                    }
                  } else {
                    res.status(400).json({
                      error: {
                        "code": "400",
                        "message": "ค่า lineid เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
                        "detail": "Bad Request"
                      }
                    })
                  }
  })
})

exports.adduser = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const leave = []
    if (req.query.fname != "" && req.query.fname ) {
      if (req.query.nname != "" && req.query.nname ) {
        if (req.query.lname != "" && req.query.lname ) {
          if (req.query.company != "" && req.query.company ) {
            if (req.query.tel != "" && req.query.tel ) {
              if (req.query.position != "" && req.query.position ) {
                await db.collection('leave').get().then(snapshot => {
                  snapshot.forEach((doc) => {
                    if (doc.data().leaveCompany == req.query.company) {
                      leave.push({
                        leaveType: doc.data().leaveType,
                        leaveDay: doc.data().leaveDay
                      })
                    }
                  })
                  return
                })
                let date_ob = Date.now();
                let dateY = new Date();
                let getY = dateY.getFullYear();
                if (req.query.id == "") {
                  db.collection("member").add({
                      lineid: req.query.lineid,
                      img: req.query.img,
                      pname: req.query.pname,
                      fname: req.query.fname,
                      lname: req.query.lname,
                      nname: req.query.nname,
                      tel: req.query.tel,
                      year:getY,
                      position: req.query.position,
                      company: req.query.company,
                      status: 0,
                      statusfail: 0,
                      leave: leave,
                      createAt: date_ob,
                      editAt: date_ob,
                    })
                    .then(async function () {
                      const userid = req.query.lineid
                      const name = []
                      const adminP = []
                      let root = []
                      await db.collection('member').where("lineid", "==", userid).get()
                        .then(snapshot => {
                          snapshot.forEach((doc) => {
                            name.push({
                              name: doc.data().pname + doc.data().fname + " " + doc.data().lname,
                              company: doc.data().company
                            })
                          })
                          return
                        })
                      await db.collection('member').where('status', '>=', 4).get()
                        .then(snapshot => {
                          if (snapshot.docs.length != 0) {
                            snapshot.forEach((doc) => {
                              if (doc.data().company == name[0].company) {
                                adminP.push(doc.data().lineid)
                              }
                            })
                            return
                          }
                        })
                      await db.collection('member').where('status', '==', 5).get()
                        .then(snapshot => {
                          if (snapshot.docs.length != 0) {
                            snapshot.forEach((doc) => {
                              root.push(doc.data().lineid)
                            })
                            return
                          }
                        })
                      const messageme = {
                        type: 'text',
                        text: 'กรุณารอสักครู่ ระบบได้ดำเนินการส่งคำขอยืนยันตัวตนเรียบร้อยแล้ว'
                      };
                      let companyreq = name[0].company.replace(/ /g, '%20')
                      const messageadmin = {
                        type: 'text',
                        text: name[0].name + ` ได้ส่งคำขอการยืนยันตัวตน กรุณาตรวจสอบ https://liff.line.me/1653895097-Wy9eoaPl?action=allowuser/${companyreq}`
                      };
                      if (adminP.length != 0 || root.length != 0) {
                        if (adminP.length == 0) {
                          client.pushMessage(userid, messageme)
                            .then(() => {
                              client.multicast(root,
                                  [messageadmin, ]
                                )
                                .then(() => {
                                  res.status(200).json('success')
                                })
                                .catch((err) => {
                                  res.json(err)
                                });
                            })
                            .catch((err) => {
                              res.json(err)
                            });
                        } else {
                          client.pushMessage(userid, messageme)
                            .then(() => {
                              client.multicast(adminP,
                                  [messageadmin, ]
                                )
                                .then(() => {
                                  res.status(200).json('success')
                                })
                                .catch((err) => {
                                  res.json(err)
                                });
                            })
                            .catch((err) => {
                              res.json(err)
                            });
                        }
                      } else {
                        const messageme = {
                          type: 'text',
                          text: 'กรุณารอสักครู่ ระบบได้ดำเนินการส่งคำขอยืนยันตัวตนเรียบร้อยแล้ว'
                        };
                        client.pushMessage(userid, messageme)
                          .then(() => {
                            res.status(200).json('success')
                          })
                          .catch((err) => {
                            res.json(err)
                          });
                      }
                    })
                } else {
                  db.collection('member').doc(req.query.id).update({
                    fname: req.query.fname,
                    lname: req.query.lname,
                    nname: req.query.nname,
                    tel: req.query.tel,
                    position: req.query.position,
                    company: req.query.company,
                    status: 0,
                    leave: leave,
                    editAt: date_ob,
                  }).then(async () => {
                    const userid = req.query.lineid
                    const name = []
                    const adminP = []
                    let root = []
                    await db.collection('member').where("lineid", "==", userid).get()
                      .then(snapshot => {
                        snapshot.forEach((doc) => {
                          name.push({
                            name: doc.data().pname + doc.data().fname + " " + doc.data().lname,
                            company: doc.data().company
                          })
                        })
                        return
                      })
                    await db.collection('member').where('status', '>=', 4).get()
                      .then(snapshot => {
                        if (snapshot.docs.length != 0) {
                          snapshot.forEach((doc) => {
                            if (doc.data().company == name[0].company) {
                              adminP.push(doc.data().lineid)
                            }
                          })
                          return
                        }
                      })
                    await db.collection('member').where('status', '==', 5).get()
                      .then(snapshot => {
                        if (snapshot.docs.length != 0) {
                          snapshot.forEach((doc) => {
                            root.push(doc.data().lineid)
                          })
                          return
                        }
                      })
                      const messageme = {
                        type: 'text',
                        text: 'กรุณารอสักครู่ ระบบได้ดำเนินการส่งคำขอยืนยันตัวตนเรียบร้อยแล้ว'
                      };
                      let companyreq = name[0].company.replace(/ /g, '%20')
                      const messageadmin = {
                        type: 'text',
                        text: name[0].name + ` ได้ส่งคำขอการยืนยันตัวตน กรุณาตรวจสอบ https://liff.line.me/1653895097-Wy9eoaPl?action=allowuser/${companyreq}`
                      };
                    if (adminP.length != 0 || root.length != 0) {
                      if (adminP.length == 0) {
                        client.pushMessage(userid, messageme)
                          .then(() => {
                            client.multicast(root,
                                [messageadmin, ]
                              )
                              .then(() => {
                                res.status(200).json('success')
                              })
                              .catch((err) => {
                                res.json(err)
                              });
                          })
                          .catch((err) => {
                            res.json(err)
                          });
                      } else {
                        client.pushMessage(userid, messageme)
                          .then(() => {
                            client.multicast(adminP,
                                [messageadmin, ]
                              )
                              .then(() => {
                                res.status(200).json('success')
                              })
                              .catch((err) => {
                                res.json(err)
                              });
                          })
                          .catch((err) => {
                            res.json(err)
                          });
                      }
                    } else {
                      const messageme = {
                        type: 'text',
                        text: 'กรุณารอสักครู่ ระบบได้ดำเนินการส่งคำขอยืนยันตัวตนเรียบร้อยแล้ว'
                      };
                      client.pushMessage(userid, messageme)
                        .then(() => {
                          res.status(200).json('success')
                        })
                        .catch((err) => {
                          res.json(err)
                        });
                    }
                  }).catch((err) => {
                    res.json('error ' + err)
                  })
                }
              } else {
                res.status(400).json({
                  error: {
                    "code": "400",
                    "message": "ค่า position เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
                    "detail": "Bad Request"
                  }
                })
              }
            } else {
              res.status(400).json({
                error: {
                  "code": "400",
                  "message": "ค่า tel เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
                  "detail": "Bad Request"
                }
              })
            }
          } else {
            res.status(400).json({
              error: {
                "code": "400",
                "message": "ค่า company เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
                "detail": "Bad Request"
              }
            })
          }
        } else {
          res.status(400).json({
            error: {
              "code": "400",
              "message": "ค่า lname เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
              "detail": "Bad Request"
            }
          })
        }
      } else {
        res.status(400).json({
          error: {
            "code": "400",
            "message": "ค่า nname เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
            "detail": "Bad Request"
          }
        })
      }
    } else {
      res.status(400).json({
        error: {
          "code": "400",
          "message": "ค่า fname เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
          "detail": "Bad Request"
        }
      })
    }
  })
})

exports.deluser = functions.https.onRequest((req, res) => {
  cors(req, res,async () => {
    let del = []
    let name = []
    let adminP = []
    let root = []
    if (req.query.userid != "" && req.query.userid ) {
      if (req.query.lineid != "" && req.query.lineid ) {

        db.collection('member').where("lineid", "==", req.query.userid).get()
          .then( function (querySnapshot) {
            querySnapshot.forEach(async function (doc) {
              name.push({
                name: doc.data().pname + doc.data().fname + " " + doc.data().lname,
                company: doc.data().company
              })
              
              await db.collection('member').where('status', '>=', 4).get()
                        .then(snapshot => {
                          if (snapshot.docs.length != 0) {
                            snapshot.forEach((doc) => {
                              if (doc.data().company == name[0].company ) {
                                adminP.push(doc.data().lineid)
                              }
                            })
                          }
                          return
                        })
                      await db.collection('member').where('status', '==', 5).get()
                        .then(snapshot => {
                          if (snapshot.docs.length != 0) {
                            snapshot.forEach((doc) => {
                              root.push(doc.data().lineid)
                            })
                          }
                          return
                        })
              db.collection("member").doc(doc.id).delete().then(async function () {
                await db.collection("leave_request").where("lineid", "==", req.query.userid).get()
                  .then(function (querySnapshot) {
                    if (querySnapshot.docs.length != 0) {
                      querySnapshot.forEach(function (doc) {
                        del.push({
                          id: doc.id
                        })
                      })
                    }
                    // else{res.json("aaaa" && req.query. )}
                  }).catch(function (error) {
                    res.json("Error removing document: ", error);
                  })
                  let userline =req.query.lineid
              let nameline =[{name:"asd",status:"ad"}]
                  await db.collection('member').where("lineid", "==", userline).get()
                    .then(snapshot => {
                      snapshot.forEach((doc) => {
                        let status = []
                        if(doc.data().status == 4){
                          status.unshift("Admin")
                        }
                        if(doc.data().status == 5){
                          status.push("Super Admin")
                        }
                        nameline.unshift({
                          name: doc.data().pname + doc.data().fname + " " + doc.data().lname,status:status[0]
                        })
                      })
                      return
                    })
                if (del.length != 0) {
                  // res.json("me" && req.query. )
                  for (let index = 0; index < del.length; index++) {
                    db.collection("leave_request").doc(del[index].id).delete().then(function () {
                      let position = del.length - 1
                      if (index == position) {
                        const messageme = {
                          type: 'text',
                          text: 'บัญชีคุณถูกลบโดยผู้ดูแลระบบ'
                        };
                        const messageadmin = {
                          type: 'text',
                          text: `${nameline[0].name} (${nameline[0].status})ได้ดำเนินการลบบัญชีของ ${name[0].name} ${doc.data().company} เสร็จสิ้น`
                        };
                        if (adminP.length != 0 || root.length != 0) {
                          if (adminP.length == 0) {
                            client.pushMessage(req.query.userid, messageme)
                              .then(() => {
                                client.multicast(root,
                                    [messageadmin, ]
                                  )
                                  .then(() => {
                                    res.status(200).json('success')
                                  })
                                  .catch((err) => {
                                    res.json(err)
                                  });
                              })
                              .catch((err) => {
                                res.json(err)
                              });
                          } else {
                            client.pushMessage(req.query.userid, messageme)
                              .then(() => {
                                client.multicast(adminP,
                                    [messageadmin, ]
                                  )
                                  .then(() => {
                                    res.status(200).json('success')
                                  })
                                  .catch((err) => {
                                    res.json(err)
                                  });
                              })
                              .catch((err) => {
                                res.json(err)
                              });
                          }
                        } else {
                          client.pushMessage(req.query.userid, messageme)
                          .then(() => {
                            client.multicast(adminP,
                                [messageadmin, ]
                              )
                              .then(() => {
                                res.status(200).json('success')
                              })
                              .catch((err) => {
                                res.json(err)
                              });
                          })
                          .catch((err) => {
                            res.json(err)
                          });
                        }
                      }
                    }).catch(function (error) {
                      res.json("Error removing document: ", error);
                    })
                  }
                } else {
                  const messageme = {
                    type: 'text',
                    text: 'บัญชีคุณถูกลบโดยผู้ดูแลระบบ'
                  };
                  const messageadmin = {
                    type: 'text',
                    text: `${nameline[0].name} (${nameline[0].status}) ได้ดำเนินการลบบัญชีของ ${name[0].name} ${doc.data().company} เสร็จสิ้น`
                  };
                  if (adminP.length != 0 || root.length != 0) {
                    if (adminP.length == 0) {
                      client.pushMessage(req.query.userid, messageme)
                        .then(() => {
                          client.multicast(root,
                              [messageadmin, ]
                            )
                            .then(() => {
                              res.status(200).json('success')
                            })
                            .catch((err) => {
                              res.json(err)
                            });
                        })
                        .catch((err) => {
                          res.json(err)
                        });
                    } else {
                      client.pushMessage(req.query.userid, messageme)
                        .then(() => {
                          client.multicast(adminP,
                              [messageadmin, ]
                            )
                            .then(() => {
                              res.status(200).json('success')
                            })
                            .catch((err) => {
                              res.json(err)
                            });
                        })
                        .catch((err) => {
                          res.json(err)
                        });
                    }
                  } else {
                      client.pushMessage(req.query.userid, messageme)
                        
                            .then(() => {
                              res.status(200).json('success')
                            })
                            .catch((err) => {
                              res.json(err)
                            });
                  }
                }
              }).catch((err) => {
                res.json(err)
              })
            })
          })
      } else {
        res.status(400).json({
          error: {
            "code": "400",
            "message": "ค่า lineid เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
            "detail": "Bad Request"
          }
        })
      }
    } else {
      res.status(400).json({
        error: {
          "code": "400",
          "message": "ค่า userid เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
          "detail": "Bad Request"
        }
      })
    }
  })
}) //

exports.changeuser = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    let date_ob = Date.now();
    if (req.query.lineid != "" && req.query.lineid ) {
      if (req.query.userid != "" && req.query.userid ) {
        if (req.query.fname != "" && req.query.fname ) {
          if (req.query.lname != "" && req.query.lname ) {
            if (req.query.nname != "" && req.query.nname ) {
              if (req.query.tel != "" && req.query.tel ) {
                if (req.query.position != "" && req.query.position ) {
                  if (req.query.userid == req.query.lineid) {
                    db.collection('member').where("lineid", "==", req.query.userid).get()
                      .then(function (querySnapshot) {
                        querySnapshot.forEach(function (doc) {
                          db.collection('member').doc(doc.id).update({
                            img: req.query.img,
                            fname: req.query.fname,
                            lname: req.query.lname,
                            nname: req.query.nname,
                            tel: req.query.tel,
                            position: req.query.position,
                            editAt: date_ob,
                          }).then(() => {
                            const messageme = {
                              type: 'text',
                              text: 'คุณได้แก้ไขข้อมูลส่วนตัวสำเร็จ'
                            };
                            client.pushMessage(req.query.userid, messageme)
                              .then(() => {
                                res.status(200).json('success')
                              })
                              .catch((err) => {
                                res.json('error ' + err)
                              });
                          }).catch((err) => {
                            res.json('error ' + err)
                          })
                        })
                      })
                  } else {
                    let name = []
                    let nameline = []
                    db.collection('member').where("lineid", "==", req.query.lineid).get()
                      .then(function (querySnapshot) {
                        querySnapshot.forEach(function (doc) {
                          let status = []
                        if(doc.data().status == 4){
                          status.push("Admin")
                        }
                        if(doc.data().status == 5){
                          status.push("Super Admin")
                        }
                          nameline.push({
                            name: doc.data().pname + doc.data().fname + " " + doc.data().lname,
                            status: status[0]
                          })
                        })
                      })
                      
                    db.collection('member').where("lineid", "==", req.query.userid).get()
                      .then(function (querySnapshot) {
                        querySnapshot.forEach(function (doc) {
                          name.push({
                            name: doc.data().pname + doc.data().fname + " " + doc.data().lname,
                            company: doc.data().company
                          })
                          db.collection('member').doc(doc.id).update({
                            fname: req.query.fname,
                            lname: req.query.lname,
                            nname: req.query.nname,
                            tel: req.query.tel,
                            position: req.query.position,
                            status: Number(req.query.status),
                            editAt: date_ob,
                          }).then(async() => {
                    let root = []
                    let adminP = []
                            await db.collection('member').where('status', '>=', 4).get()
                        .then(snapshot => {
                          if (snapshot.docs.length != 0) {
                            snapshot.forEach((doc) => {
                              if (doc.data().company == name[0].company) {
                                adminP.push(doc.data().lineid)
                              }
                            })
                            return
                          }
                        })
                      await db.collection('member').where('status', '==', 5).get()
                        .then(snapshot => {
                          if (snapshot.docs.length != 0) {
                            snapshot.forEach((doc) => {
                              root.push(doc.data().lineid)
                            })
                            return
                          }
                        })
                            if (doc.data().status == Number(req.query.status)) {
                              const messageme = {
                                type: 'text',
                                text: 'ผู้ดูแลระบบ ได้ดำเนินการแก้ไขข้อมูลของคุณ'
                              };
                              const messageadmin = {
                                type: 'text',
                                text: `คุณได้แก้ไขข้อมูลของ ${name[0].name} ${doc.data().company} `
                              };
                              client.pushMessage(req.query.userid, messageme)
                                .then(() => {
                                  client.pushMessage(req.query.lineid, messageadmin)
                                    .then(() => {
                                      res.status(200).json('success')
                                    })
                                    .catch((err) => {
                                      res.json(err)
                                    });
                                })
                                .catch((err) => {
                                  res.json(err)
                                });
                            } else {
                              if (Number(req.query.status) == 1) {
                                const messageme = {
                                  type: 'text',
                                  text: 'ผู้ดูแลระบบ ได้ดำเนินการแก้ไขข้อมูลของคุณ เป็น User'
                                };
                                const messageadmin = {
                                  type: 'text',
                                  text: `${nameline[0].name} (${nameline[0].status})ได้ดำเนินการแก้ไขข้อมูลของ ${name[0].name} ${doc.data().company} เป็น User `
                                };
                                if (adminP.length != 0 || root.length != 0) {
                                  if (adminP.length == 0) {
                                    client.pushMessage(req.query.userid, messageme)
                                      .then(() => {
                                        client.multicast(root,
                                            [messageadmin, ]
                                          )
                                          .then(() => {
                                            res.status(200).json('success')
                                          })
                                          .catch((err) => {
                                            res.json(err)
                                          });
                                      })
                                      .catch((err) => {
                                        res.json(err)
                                      });
                                  } else {
                                    client.pushMessage(req.query.userid, messageme)
                                      .then(() => {
                                        client.multicast(adminP,
                                            [messageadmin, ]
                                          )
                                          .then(() => {
                                            res.status(200).json('success')
                                          })
                                          .catch((err) => {
                                            res.json(err)
                                          });
                                      })
                                      .catch((err) => {
                                        res.json(err)
                                      });
                                  }
                                }
                              }
                              if (Number(req.query.status) == 2) {
                                const messageme = {
                                  type: 'text',
                                  text: 'ผู้ดูแลระบบ ได้ดำเนินการแก้ไขข้อมูลของคุณ เป็น HR '
                                };
                                const messageadmin = {
                                  type: 'text',
                                  text: `${nameline[0].name} (${nameline[0].status})ได้ดำเนินการแก้ไขข้อมูลของ ${name[0].name} ${doc.data().company} เป็น HR `
                                };
                                if (adminP.length != 0 || root.length != 0) {
                                  if (adminP.length == 0) {
                                    client.pushMessage(req.query.userid, messageme)
                                      .then(() => {
                                        client.multicast(root,
                                            [messageadmin, ]
                                          )
                                          .then(() => {
                                            res.status(200).json('success')
                                          })
                                          .catch((err) => {
                                            res.json(err)
                                          });
                                      })
                                      .catch((err) => {
                                        res.json(err)
                                      });
                                  } else {
                                    client.pushMessage(req.query.userid, messageme)
                                      .then(() => {
                                        client.multicast(adminP,
                                            [messageadmin, ]
                                          )
                                          .then(() => {
                                            res.status(200).json('success')
                                          })
                                          .catch((err) => {
                                            res.json(err)
                                          });
                                      })
                                      .catch((err) => {
                                        res.json(err)
                                      });
                                  }
                              }
                            }
                              if (Number(req.query.status) == 3) {
                                const messageme = {
                                  type: 'text',
                                  text: 'ผู้ดูแลระบบ ได้ดำเนินการแก้ไขข้อมูลของคุณ เป็น Super HR'
                                };
                                const messageadmin = {
                                  type: 'text',
                                  text: `${nameline[0].name} (${nameline[0].status})ได้ดำเนินการแก้ไขข้อมูลของ ${name[0].name} ${doc.data().company} เป็น Super HR `
                                };
                                if (adminP.length != 0 || root.length != 0) {
                                  if (adminP.length == 0) {
                                    client.pushMessage(req.query.userid, messageme)
                                      .then(() => {
                                        client.multicast(root,
                                            [messageadmin, ]
                                          )
                                          .then(() => {
                                            res.status(200).json('success')
                                          })
                                          .catch((err) => {
                                            res.json(err)
                                          });
                                      })
                                      .catch((err) => {
                                        res.json(err)
                                      });
                                  } else {
                                    client.pushMessage(req.query.userid, messageme)
                                      .then(() => {
                                        client.multicast(adminP,
                                            [messageadmin, ]
                                          )
                                          .then(() => {
                                            res.status(200).json('success')
                                          })
                                          .catch((err) => {
                                            res.json(err)
                                          });
                                      })
                                      .catch((err) => {
                                        res.json(err)
                                      });
                                    }
                                  }
                              }
                              if (Number(req.query.status) == 4) {
                                const messageme = {
                                  type: 'text',
                                  text: 'ผู้ดูแลระบบ ได้ดำเนินการแก้ไขข้อมูลของคุณ เป็น Admin'
                                };
                                const messageadmin = {
                                  type: 'text',
                                  text: `${nameline[0].name} (${nameline[0].status})ได้ดำเนินการแก้ไขข้อมูลของ ${name[0].name} ${doc.data().company} เป็น Admin ของบริษัท ${doc.data().company} `
                                };
                                if (adminP.length != 0 || root.length != 0) {
                                  if (adminP.length == 0) {
                                    client.pushMessage(req.query.userid, messageme)
                                      .then(() => {
                                        client.multicast(root,
                                            [messageadmin, ]
                                          )
                                          .then(() => {
                                            res.status(200).json('success')
                                          })
                                          .catch((err) => {
                                            res.json(err)
                                          });
                                      })
                                      .catch((err) => {
                                        res.json(err)
                                      });
                                  } else {
                                    client.pushMessage(req.query.userid, messageme)
                                      .then(() => {
                                        client.multicast(adminP,
                                            [messageadmin, ]
                                          )
                                          .then(() => {
                                            res.status(200).json('success')
                                          })
                                          .catch((err) => {
                                            res.json(err)
                                          });
                                      })
                                      .catch((err) => {
                                        res.json(err)
                                      });
                                  }
                              }
                            }
                          }
                          }).catch((err) => {
                            res.json('error ' + err)
                          })
                        })
                      })
                  }
                } else {
                  res.status(400).json({
                    error: {
                      "code": "400",
                      "message": "ค่า position เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
                      "detail": "Bad Request"
                    }
                  })
                }
              } else {
                res.status(400).json({
                  error: {
                    "code": "400",
                    "message": "ค่า tel เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
                    "detail": "Bad Request"
                  }
                })
              }
            } else {
              res.status(400).json({
                error: {
                  "code": "400",
                  "message": "ค่า nname เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
                  "detail": "Bad Request"
                }
              })
            }
          } else {
            res.status(400).json({
              error: {
                "code": "400",
                "message": "ค่า lname เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
                "detail": "Bad Request"
              }
            })
          }
        } else {
          res.status(400).json({
            error: {
              "code": "400",
              "message": "ค่า fname เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
              "detail": "Bad Request"
            }
          })
        }
      } else {
        res.status(400).json({
          error: {
            "code": "400",
            "message": "ค่า userid เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
            "detail": "Bad Request"
          }
        })
      }
    } else {
      res.status(400).json({
        error: {
          "code": "400",
          "message": "ค่า lineid เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
          "detail": "Bad Request"
        }
      })
    }
  })
}) //

exports.addleave_request = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    let date_ob = Date.now();
    let dataleave = []
    let id = []
    let root = []
    if (req.query.company != "" && req.query.company) {
      if (req.query.leaveDay != "" && req.query.leaveDay) {
      if (req.query.timeEnd != "" && req.query.timeEnd) {
        if (req.query.timeStart != "" && req.query.timeStart) {
          if (req.query.dateEnd != "" && req.query.dateEnd) {
            if (req.query.dateStart != "" && req.query.dateStart) {
              if (req.query.leaveSum != ""&& req.query.leaveSum) {
                if (req.query.leaveType != ""&& req.query.leaveType) {
                  if (req.query.lineid != ""&& req.query.lineid) {
                    if (req.query.file != "" && req.query.file) {
                      let newStr = req.query.file.substring(req.query.file.length - 3, req.query.file.length)
                      if (newStr == "pdf") {
                        db.collection("leave_request").add({
                          lineid: req.query.lineid,
                          leaveType: req.query.leaveType,
                          leaveDay: Number(req.query.leaveDay),
                          leaveSum: Number(req.query.leaveSum),
                          dateStart: Number(req.query.dateStart),
                          dateEnd: Number(req.query.dateEnd),
                          timeStart: Number(req.query.timeStart),
                          timeEnd: Number(req.query.timeEnd),
                          noteMe: req.query.noteMe,
                          company: req.query.company,
                          file: "https://firebasestorage.googleapis.com/v0/b/twin-hr.appspot.com/o/certificate%2Ffile%2F" + req.query.file + "?alt=media",
                          status: 0,
                          noteAdmin: "",
                          createAt: date_ob,
                          editAt: date_ob,
                        }).then(async () => {
                          await db.collection('member').where("lineid", "==", req.query.lineid).get().then(function (querySnapshot) {
                            querySnapshot.forEach(function (doc) {
                              id.push({
                                id: doc.id
                              })
                              let i = doc.data().leave.length
                              for (let index = 0; index < i; index++) {
                                if (doc.data().leave[index].leaveType == req.query.leaveType) {
                                  let sunday = doc.data().leave[index].leaveDay - Number(req.query.leaveSum)
                                  dataleave.push({
                                    leaveType: req.query.leaveType,
                                    leaveDay: sunday
                                  })
                                } else {
                                  dataleave.push(doc.data().leave[index])
                                }
                              }
                            })
                          }).catch((err) => {
                            res.json('error' + err)
                          })
                          db.collection('member').doc(id[0].id).update({
                            leave: dataleave
                          }).then(async function () {
                            const userid = req.query.lineid
                            const name = []
                            const adminP = []
                            const root = []
                            await db.collection('member').where("lineid", "==", userid).get()
                              .then(snapshot => {
                                snapshot.forEach((doc) => {
                                  name.push({
                                    name: doc.data().pname + doc.data().fname + " " + doc.data().lname,
                                    company: doc.data().company
                                  })
                                })
                                return
                              })
                            await db.collection('member').where('status', '>=', 4).get()
                              .then(snapshot => {
                                if (snapshot.docs.length != 0) {
                                  snapshot.forEach((doc) => {
                                    if (doc.data().company == name[0].company) {
                                      adminP.push(doc.data().lineid)
                                    }
                                  })
                                }
                                return
                              })
                            await db.collection('member').where('status', '==', 5).get()
                              .then(snapshot => {
                                if (snapshot.docs.length != 0) {
                                  snapshot.forEach((doc) => {
                                    root.push(doc.data().lineid)
                                  })
                                }
                                return
                              })
                              const messageme = {
                                type: 'text',
                                text: 'กรุณารอสักครู่ ระบบได้ดำเนินการส่งคำขอลางานเรียบร้อยแล้ว'
                              };
                              let companyreq = name[0].company.replace(/ /g, '%20')
                              const messageadmin = {
                                type: 'text',
                                text: name[0].name + ` ได้ส่งคำขอการลางาน กรุณาตรวจสอบ https://liff.line.me/1653895097-Wy9eoaPl?action=allowleave-request/${companyreq}`
                              };
                            if (adminP.length != 0 || root.length != 0) {
                              if (adminP.length == 0) {
                                client.pushMessage(userid, messageme)
                                  .then(() => {
                                    client.multicast(root,
                                        [messageadmin, ]
                                      )
                                      .then(() => {
                                        res.status(200).json('success')
                                      })
                                      .catch((err) => {
                                        res.json(err)
                                      });
                                  })
                                  .catch((err) => {
                                    res.json(err)
                                  });
                              } else {
                                client.pushMessage(userid, messageme)
                                  .then(() => {
                                    client.multicast(adminP,
                                        [messageadmin, ]
                                      )
                                      .then(() => {
                                        res.status(200).json('success')
                                      })
                                      .catch((err) => {
                                        res.json(err)
                                      });
                                  })
                                  .catch((err) => {
                                    res.json(err)
                                  });
                              }
                            } else {
                              const messageme = {
                                type: 'text',
                                text: 'กรุณารอสักครู่ ระบบได้ดำเนินการส่งคำขอลางานเรียบร้อยแล้ว'
                              };
                              client.pushMessage(userid, messageme)
                                .then(() => {
                                  res.status(200).json('success')
                                })
                                .catch((err) => {
                                  res.json(err)
                                });
                            }
                          }).catch(function (err) {
                            res.json('error' + err)
                          })
                        })
                      } else  {
                        db.collection("leave_request").add({
                          lineid: req.query.lineid,
                          leaveType: req.query.leaveType,
                          leaveDay: Number(req.query.leaveDay),
                          leaveSum: Number(req.query.leaveSum),
                          dateStart: Number(req.query.dateStart),
                          dateEnd: Number(req.query.dateEnd),
                          timeStart: Number(req.query.timeStart),
                          timeEnd: Number(req.query.timeEnd),
                          noteMe: req.query.noteMe,
                          company: req.query.company,
                          file: "https://firebasestorage.googleapis.com/v0/b/twin-hr.appspot.com/o/certificate%2Fimage%2F" + req.query.file + "?alt=media",
                          status: 0,
                          noteAdmin: "",
                          createAt: date_ob,
                          editAt: date_ob,
                        }).then(async () => {
                          await db.collection('member').where("lineid", "==", req.query.lineid).get().then(function (querySnapshot) {
                            querySnapshot.forEach(function (doc) {
                              id.push({
                                id: doc.id
                              })
                              let i = doc.data().leave.length
                              for (let index = 0; index < i; index++) {
                                if (doc.data().leave[index].leaveType == req.query.leaveType) {
                                  let sunday = doc.data().leave[index].leaveDay - Number(req.query.leaveSum)
                                  dataleave.push({
                                    leaveType: req.query.leaveType,
                                    leaveDay: sunday
                                  })
                                } else {
                                  dataleave.push(doc.data().leave[index])
                                }
                              }
                            })
                          }).catch((err) => {
                            res.json('error' + err)
                          })
                          db.collection('member').doc(id[0].id).update({
                            leave: dataleave
                          }).then(async function () {
                            const userid = req.query.lineid
                            const name = []
                            const adminP = []
                            const root = []
                            await db.collection('member').where("lineid", "==", userid).get()
                              .then(snapshot => {
                                snapshot.forEach((doc) => {
                                  name.push({
                                    name: doc.data().pname + doc.data().fname + " " + doc.data().lname,
                                    company: doc.data().company
                                  })
                                })
                                return
                              })
                            await db.collection('member').where('status', '>=', 4).get()
                              .then(snapshot => {
                                if (snapshot.docs.length != 0) {
                                  snapshot.forEach((doc) => {
                                    if (doc.data().company == name[0].company) {
                                      adminP.push(doc.data().lineid)
                                    }
                                  })
                                }
                                return
                              })
                            await db.collection('member').where('status', '==', 5).get()
                              .then(snapshot => {
                                if (snapshot.docs.length != 0) {
                                  snapshot.forEach((doc) => {
                                    root.push(doc.data().lineid)
                                  })
                                }
                                return
                              })
                              const messageme = {
                                type: 'text',
                                text: 'กรุณารอสักครู่ ระบบได้ดำเนินการส่งคำขอลางานเรียบร้อยแล้ว'
                              };
                              let companyreq = name[0].company.replace(/ /g, '%20')
                              const messageadmin = {
                                type: 'text',
                                text: name[0].name + ` ได้ส่งคำขอการลางาน กรุณาตรวจสอบ https://liff.line.me/1653895097-Wy9eoaPl?action=allowleave-request/${companyreq}`
                              };
                            if (adminP.length != 0 || root.length != 0) {
                              if (adminP.length == 0) {
                                client.pushMessage(userid, messageme)
                                  .then(() => {
                                    client.multicast(root,
                                        [messageadmin, ]
                                      )
                                      .then(() => {
                                        res.status(200).json('success')
                                      })
                                      .catch((err) => {
                                        res.json(err)
                                      });
                                  })
                                  .catch((err) => {
                                    res.json(err)
                                  });
                              } else {
                                client.pushMessage(userid, messageme)
                                  .then(() => {
                                    client.multicast(adminP,
                                        [messageadmin, ]
                                      )
                                      .then(() => {
                                        res.status(200).json('success')
                                      })
                                      .catch((err) => {
                                        res.json(err)
                                      });
                                  })
                                  .catch((err) => {
                                    res.json(err)
                                  });
                              }
                            } else {
                              const messageme = {
                                type: 'text',
                                text: 'กรุณารอสักครู่ ระบบได้ดำเนินการส่งคำขอลางานเรียบร้อยแล้ว'
                              };
                              client.pushMessage(userid, messageme)
                                .then(() => {
                                  res.status(200).json('success')
                                })
                                .catch((err) => {
                                  res.json(err)
                                });
                            }
                          }).catch(function (err) {
                            res.json('error' + err)
                          })
                        })
                      }
                    } else {
                      db.collection("leave_request").add({
                        lineid: req.query.lineid,
                        leaveType: req.query.leaveType,
                        leaveDay: Number(req.query.leaveDay),
                        leaveSum: Number(req.query.leaveSum),
                          dateStart: Number(req.query.dateStart),
                          dateEnd: Number(req.query.dateEnd),
                          timeStart: Number(req.query.timeStart),
                          timeEnd: Number(req.query.timeEnd),
                        noteMe: req.query.noteMe,
                        company: req.query.company,
                        file: req.query.file,
                        status: 0,
                        noteAdmin: "",
                        createAt: date_ob,
                        editAt: date_ob,
                      }).then(async () => {
                        await db.collection('member').where("lineid", "==", req.query.lineid).get().then(function (querySnapshot) {
                          querySnapshot.forEach(function (doc) {
                            id.push({
                              id: doc.id
                            })
                            let i = doc.data().leave.length
                            for (let index = 0; index < i; index++) {
                              if (doc.data().leave[index].leaveType == req.query.leaveType) {
                                let sunday = doc.data().leave[index].leaveDay - Number(req.query.leaveSum)
                                dataleave.push({
                                  leaveType: req.query.leaveType,
                                  leaveDay: sunday
                                })
                              } else {
                                dataleave.push(doc.data().leave[index])
                              }
                            }
                          })
                        }).catch((err) => {
                          res.json('error' + err)
                        })
                        db.collection('member').doc(id[0].id).update({
                          leave: dataleave
                        }).then(async function () {
                          const userid = req.query.lineid
                          const name = []
                          const adminP = []
                          const root = []
                          await db.collection('member').where("lineid", "==", userid).get()
                            .then(snapshot => {
                              snapshot.forEach((doc) => {
                                name.push({
                                  name: doc.data().pname + doc.data().fname + " " + doc.data().lname,
                                  company: doc.data().company
                                })
                              })
                              return
                            })
                          await db.collection('member').where('status', '>=', 4).get()
                            .then(snapshot => {
                              if (snapshot.docs.length != 0) {
                                snapshot.forEach((doc) => {
                                  if (doc.data().company == name[0].company) {
                                    adminP.push(doc.data().lineid)
                                  }
                                })
                              }
                              return
                            })
                          await db.collection('member').where('status', '==', 5).get()
                            .then(snapshot => {
                              if (snapshot.docs.length != 0) {
                                snapshot.forEach((doc) => {
                                  root.push(doc.data().lineid)
                                })
                              }
                              return
                            })
                          const messageme = {
                            type: 'text',
                            text: 'กรุณารอสักครู่ ระบบได้ส่งคำขอลางานเรียบร้อยแล้ว'
                          };
                          let companyreq = name[0].company.replace(/ /g, '%20')
                          const messageadmin = {
                            type: 'text',
                            text: name[0].name + ` ได้ส่งคำขอการลางาน กรุณาตรวจสอบ https://liff.line.me/1653895097-Wy9eoaPl?action=allowleave-request/${companyreq}`
                            
                          };
                          if (adminP.length != 0 || root.length != 0) {
                            if (adminP.length == 0) {
                              client.pushMessage(userid, messageme)
                                .then(() => {
                                  client.multicast(root,
                                      [messageadmin, ]
                                    )
                                    .then(() => {
                                      res.status(200).json('success')
                                    })
                                    .catch((err) => {
                                      res.json(err)
                                    });
                                })
                                .catch((err) => {
                                  res.json(err)
                                });
                            } else {
                              client.pushMessage(userid, messageme)
                                .then(() => {
                                  client.multicast(adminP,
                                      [messageadmin, ]
                                    )
                                    .then(() => {
                                      res.status(200).json('success')
                                    })
                                    .catch((err) => {
                                      res.json(err)
                                    });
                                })
                                .catch((err) => {
                                  res.json(err)
                                });
                            }
                          } else {
                            const messageme = {
                              type: 'text',
                              text: 'กรุณารอสักครู่ ระบบได้ส่งคำขอลางานเรียบร้อยแล้ว'
                            };
                            client.pushMessage(userid, messageme)
                              .then(() => {
                                res.status(200).json('success')
                              })
                              .catch((err) => {
                                res.json(err)
                              });
                          }
                        }).catch(function (err) {
                          res.json('error' + err)
                        })
                      })
                    }
                  } else {
                    res.status(400).json({
                      error: {
                        "code": "400",
                        "message": "ค่า lineid เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
                        "detail": "Bad Request"
                      }
                    })
                  }
                } else {
                  res.status(400).json({
                    error: {
                      "code": "400",
                      "message": "ค่า leaveType เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
                      "detail": "Bad Request"
                    }
                  })
                }
              } else {
                res.status(400).json({
                  error: {
                    "code": "400",
                    "message": "ค่า leaveSum เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
                    "detail": "Bad Request"
                  }
                })
              }
            } else {
              res.status(400).json({
                error: {
                  "code": "400",
                  "message": "ค่า dateStart เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
                  "detail": "Bad Request"
                }
              })
            }
          } else {
            res.status(400).json({
              error: {
                "code": "400",
                "message": "ค่า dateEnd เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
                "detail": "Bad Request"
              }
            })
          }
        } else {
          res.status(400).json({
            error: {
              "code": "400",
              "message": "ค่า timeStart เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
              "detail": "Bad Request"
            }
          })
        }
      } else {
        res.status(400).json({
          error: {
            "code": "400",
            "message": "ค่า timeEnd เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
            "detail": "Bad Request"
          }
        })
      }
    }else{
      res.status(400).json({
        error: {
          "code": "400",
          "message": "ค่า leaveDay เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
          "detail": "Bad Request"
        }
        
      })
    }
    } else {
      res.status(400).json({
        error: {
          "code": "400",
          "message": "ค่า company เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
          "detail": "Bad Request"
        }
        
      })
    }
  })
})//

exports.delleave_request = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    let leave = []
    let id = req.query.id
    if (req.query.id != "" && req.query.id ) {
      var docRef = db.collection("leave_request").doc(id);
      docRef.get().then(function (docleave) {
        db.collection("leave_request" ).doc(req.query.id).delete().then(function () {
          // res.json({data:doc.data(),id:id})
          db.collection("member").where("lineid", "==", docleave.data().lineid).get()
            .then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                for (let index = 0; index < doc.data().leave.length; index++) {
                  if (docleave.data().leaveType == doc.data().leave[index].leaveType) {
                    let day = docleave.data().leaveSum + doc.data().leave[index].leaveDay
                    leave.push({
                      leaveType: docleave.data().leaveType,
                      leaveDay: day
                    })
                  } else {
                    leave.push({
                      leaveType: doc.data().leave[index].leaveType,
                      leaveDay: doc.data().leave[index].leaveDay
                    })
                  }
                }
                db.collection('member').doc(doc.id).update({
                  leave: leave
                }).then(() => {
                  res.json("success" )
                }).catch((err) => {
                  res.json('error ' + err)
                })
              })
            }).catch(function (error) {
              res.json("Error removing document: ", error);
            })
        }).catch(function (error) {
          res.json("Error removing document: ", error);
        })
      }).catch(function (error) {
        console.log("Error getting document:", error);
      })
    } else {
      res.status(400).json({
        error: {
          "code": "400",
          "message": "ค่า id ของ leave_request เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
          "detail": "Bad Request"
        }
      })
    }
  })
})//

exports.deleteleave_request = functions.firestore.document('leave_request/{userid}').onDelete(async (change, context) => {
  const userid = change.data().lineid
  const name = []
  const adminP = []
  const root = []
  await db.collection('member').where("lineid", "==", userid).get()
    .then(snapshot => {
      snapshot.forEach((doc) => {
        name.push({
          name: doc.data().pname + doc.data().fname + " " + doc.data().lname,
          company: doc.data().company
        })
      })
      return
    })
  await db.collection('member').where('status', '>=', 4).get()
    .then(snapshot => {
      if (snapshot.docs.length != 0) {
        snapshot.forEach((doc) => {
          if (doc.data().company == name[0].company) {
            adminP.push(doc.data().lineid)
          }
        })
      }
      return
    })
  await db.collection('member').where('status', '==', 5).get()
    .then(snapshot => {
      if (snapshot.docs.length != 0) {
        snapshot.forEach((doc) => {
          root.push(doc.data().lineid)
        })
      }
      return
    })
  const messageme = {
    type: 'text',
    text: 'คุณได้ยกเลิกการส่งคำขอลางาน'
  };
  const messageadmin = {
    type: 'text',
    text: name[0].name + ' ' + name[0].company + ' ได้ยกเลิกคำขอลางาน'
  };
  if (adminP.length != 0 || root.length != 0) {
    if (adminP.length == 0) {
      client.pushMessage(userid, messageme)
        .then(() => {
          client.multicast(root,
              [messageadmin, ]
            )
            .then(() => {
              res.status(200).json('success')
            })
            .catch((err) => {
              res.json(err)
            });
        })
        .catch((err) => {
          res.json(err)
        });
    } else {
      client.pushMessage(userid, messageme)
        .then(() => {
          client.multicast(adminP,
              [messageadmin, ]
            )
            .then(() => {
              res.status(200).json('success')
            })
            .catch((err) => {
              res.json(err)
            });
        })
        .catch((err) => {
          res.json(err)
        });
    }
  } else {
    const messageme = {
      type: 'text',
      text: 'คุณได้ยกเลิกการส่งคำขอลางาน'
    };
    client.pushMessage(userid, messageme)
      .then(() => {
        res.status(200).json('success')
      })
      .catch((err) => {
        res.json(err)
      });
  }
})//

exports.changeleave_request = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.query.file != "" && req.query.file ) {
      if (req.query.id != "" && req.query.id ) {
        let newStr = req.query.file.substring(req.query.file.length - 3, req.query.file.length)
        db.collection('leave_request').doc(req.query.id).get().then(function (docleave) {
          if (newStr == "pdf"  ) {
            db.collection('leave_request').doc(req.query.id).update({
              file: "https://firebasestorage.googleapis.com/v0/b/twin-hr.appspot.com/o/certificate%2Ffile%2F" + req.query.file + "?alt=media",
            }).then(async () => {
              const userid = docleave.data().lineid
              const name = []
              const adminP = []
              const root = []
              await db.collection('member').where("lineid", "==", userid).get()
                .then(snapshot => {
                  snapshot.forEach((doc) => {
                    name.push({
                      name: doc.data().pname + doc.data().fname + " " + doc.data().lname,
                      company: doc.data().company
                    })
                  })
                  return
                })
              await db.collection('member').where('status', '>=', 4).get()
                .then(snapshot => {
                  if (snapshot.docs.length != 0) {
                    snapshot.forEach((doc) => {
                      if (doc.data().company == name[0].company) {
                        adminP.push(doc.data().lineid)
                      }
                    })
                  }
                  return
                })
              await db.collection('member').where('status', '==', 5).get()
                .then(snapshot => {
                  if (snapshot.docs.length != 0) {
                    snapshot.forEach((doc) => {
                      root.push(doc.data().lineid)
                    })
                  }
                  return
                })
              const messageme = {
                type: 'text',
                text: 'ดำเนินการแก้ไขไฟล์แนบเรียบร้อย'
              };
              const messageadmin = {
                type: 'text',
                text: name[0].name + ' ' + name[0].company + ' ได้แก้ไฟล์แนบ ตรวจสอบไฟล์อีกครั้ง '+ `https://liff.line.me/1653895097-Wy9eoaPl?action=oneallow/${req.query.id}`
              };
              if (adminP.length != 0 || root.length != 0) {
                if (adminP.length == 0) {
                  client.pushMessage(userid, messageme)
                    .then(() => {
                      client.multicast(root,
                          [messageadmin, ]
                        )
                        .then(() => {
                          res.status(200).json('success')
                        })
                        .catch((err) => {
                          res.json(err)
                        });
                    })
                    .catch((err) => {
                      res.json(err)
                    });
                } else {
                  client.pushMessage(userid, messageme)
                    .then(() => {
                      client.multicast(adminP,
                          [messageadmin, ]
                        )
                        .then(() => {
                          res.status(200).json('success')
                        })
                        .catch((err) => {
                          res.json(err)
                        });
                    })
                    .catch((err) => {
                      res.json(err)
                    });
                }
              } else {
                const messageme = {
                  type: 'text',
                  text: 'ดำเนินการแก้ไขไฟล์แนบเรียบร้อย'
                };
          
                client.pushMessage(userid, messageme)
                  .then(() => {
                    res.status(200).json('success')
                  })
                  .catch((err) => {
                    res.json(err)
                  });
              }
            }).catch((err) => {
              res.json('error ' + err)
            })
          } else  {
            db.collection('leave_request').doc(req.query.id).update({
              file: "https://firebasestorage.googleapis.com/v0/b/twin-hr.appspot.com/o/certificate%2Fimage%2F" + req.query.file + "?alt=media",
            }).then(async () => {
              const userid = docleave.data().lineid
              const name = []
              const adminP = []
              const root = []
              await db.collection('member').where("lineid", "==", userid).get()
                .then(snapshot => {
                  snapshot.forEach((doc) => {
                    name.push({
                      name: doc.data().pname + doc.data().fname + " " + doc.data().lname,
                      company: doc.data().company
                    })
                  })
                  return
                })
              await db.collection('member').where('status', '>=', 4).get()
                .then(snapshot => {
                  if (snapshot.docs.length != 0) {
                    snapshot.forEach((doc) => {
                      if (doc.data().company == name[0].company) {
                        adminP.push(doc.data().lineid)
                      }
                    })
                  }
                  return
                })
              await db.collection('member').where('status', '==', 5).get()
                .then(snapshot => {
                  if (snapshot.docs.length != 0) {
                    snapshot.forEach((doc) => {
                      root.push(doc.data().lineid)
                    })
                  }
                  return
                })
                const messageme = {
                  type: 'text',
                  text: 'ดำเนินการแก้ไขไฟล์แนบเรียบร้อย'
                };
                const messageadmin = {
                  type: 'text',
                  text: name[0].name + ' ' + name[0].company + ' ได้แก้ไฟล์แนบ ตรวจสอบไฟล์อีกครั้ง '+ `https://liff.line.me/1653895097-Wy9eoaPl?action=oneallow/${req.query.id}`
                };
              if (adminP.length != 0 || root.length != 0) {
                if (adminP.length == 0) {
                  client.pushMessage(userid, messageme)
                    .then(() => {
                      client.multicast(root,
                          [messageadmin, ]
                        )
                        .then(() => {
                          res.status(200).json('success')
                        })
                        .catch((err) => {
                          res.json(err)
                        });
                    })
                    .catch((err) => {
                      res.json(err)
                    });
                } else {
                  client.pushMessage(userid, messageme)
                    .then(() => {
                      client.multicast(adminP,
                          [messageadmin, ]
                        )
                        .then(() => {
                          res.status(200).json('success')
                        })
                        .catch((err) => {
                          res.json(err)
                        });
                    })
                    .catch((err) => {
                      res.json(err)
                    });
                }
              } else {
                const messageme = {
                  type: 'text',
                  text: 'ดำเนินการแก้ไขไฟล์แนบเรียบร้อย'
                };
           
                client.pushMessage(userid, messageme)
                  .then(() => {
                    res.status(200).json('success')
                  })
                  .catch((err) => {
                    res.json(err)
                  });
              }
            }).catch((err) => {
              res.json('error ' + err)
            })
          }
        })
      } else {
        res.status(400).json({
          error: {
            "code": "400",
            "message": "ค่า id ของ leave_request เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
            "detail": "Bad Request"
          }
        })
      }
    } else {
      res.status(400).json({
        error: {
          "code": "400",
          "message": "ค่า file เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
          "detail": "Bad Request"
        }
      })
    }
  })
})//

exports.addcompany = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.query.imageCompany != "" && req.query.imageCompany ) {
      if (req.query.nameCompany != "" && req.query.nameCompany ) {
        if (req.query.lineid != "" && req.query.lineid ) {
          let newStr = req.query.imageCompany.substring(req.query.imageCompany.length - 3, req.query.imageCompany.length)
          // if (newStr == "jpg") {
            const nameline = []
            let root = []
                await db.collection('member').where("lineid", "==", req.query.lineid).get()
                    .then(snapshot => {
                      snapshot.forEach((doc) => {
                        let status = []
                        if(doc.data().status == 4){
                          status.push("Admin")
                        }
                        if(doc.data().status == 5){
                          status.push("Super Admin")
                        }
                        nameline.push({
                          name: doc.data().pname + doc.data().fname + " " + doc.data().lname,status:status[0]
                        })
                      })
                      return
                    })
                    
                    await db.collection('member').where('status', '==', 5).get()
                        .then(snapshot => {
                          if (snapshot.docs.length != 0) {
                            snapshot.forEach((doc) => {
                              root.push(doc.data().lineid)
                            })
                          }
                          return
                        })
            db.collection("company").add({
                nameCompany: req.query.nameCompany,
                imageCompany: `https://firebasestorage.googleapis.com/v0/b/twin-hr.appspot.com/o/company%2F${req.query.imageCompany}?alt=media`,
              })
              .then(function () {
                const messageme = {
                  type: 'text',
                  text: nameline[0].name+' ('+nameline[0].status+') ได้ดำเนินการเพิ่มบริษัท ' + req.query.nameCompany 
                };
                client.multicast(root,
                  [messageme, ]
                )
                  .then(() => {
                    res.json("success"  )
                  }).catch((err) => {
                    res.json(err)
                  })
              })
          // } else {
          //   res.json("อัพโหลดได้เฉพาะไฟล์ .jpg")
          // }
        } else {
          res.status(400).json({
            error: {
              "code": "400",
              "message": "ค่า lineid เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
              "detail": "Bad Request"
            }
          })
        }
      } else {
        res.status(400).json({
          error: {
            "code": "400",
            "message": "ค่า nameCompany เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
            "detail": "Bad Request"
          }
        })
      }
    } else {
      res.status(400).json({
        error: {
          "code": "400",
          "message": "ค่า imageCompany เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
          "detail": "Bad Request"
        }
      })
    }
  })
})//

exports.changecompany = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    let oldname = []
    if (req.query.imageCompany != "" && req.query.imageCompany ) {
      if (req.query.nameCompany != "" && req.query.nameCompany ) {
        if (req.query.lineid != "" && req.query.lineid ) {
          const nameline = []
          let root = []
              await db.collection('member').where("lineid", "==", req.query.lineid).get()
                  .then(snapshot => {
                    snapshot.forEach((doc) => {
                      let status = []
                      if(doc.data().status == 4){
                        status.push("Admin")
                      }
                      if(doc.data().status == 5){
                        status.push("Super Admin")
                      }
                      nameline.push({
                        name: doc.data().pname + doc.data().fname + " " + doc.data().lname,status:status[0]
                      })
                    })
                    return
                  })
                  
                  await db.collection('member').where('status', '==', 5).get()
                      .then(snapshot => {
                        if (snapshot.docs.length != 0) {
                          snapshot.forEach((doc) => {
                            root.push(doc.data().lineid)
                          })
                        }
                        return
                      })
          if (req.query.nameCompany != "") {
            await db.collection("company").doc(req.query.id).get().then(async function (querySnapshot) {
              oldname.push({
                name: querySnapshot.data().nameCompany
              })

            })
            // res.json(oldname)
            db.collection("company").doc(req.query.id).update({
                nameCompany: req.query.nameCompany,
              })
              .then(async function () {

                res.json("success")
              })
          }
          if (req.query.imageCompany != "" ) {
            let newStr = req.query.imageCompany.substring(req.query.imageCompany.length - 3, req.query.imageCompany.length)
            // if (newStr == "jpg") {
              db.collection("company").doc(req.query.id).update({
                  imageCompany: "https://firebasestorage.googleapis.com/v0/b/twin-hr.appspot.com/o/company%2F" + req.query.imageCompany + "?alt=media",
                })
                .then(function () {
                  res.json("success")
                })
            // } else {
            //   res.json("อัพโหลดได้เฉพาะไฟล์ .jpg" )
            // }
          }
          const messageme = {
            type: 'text',
            text: nameline[0].name+' ('+nameline[0].status+') ได้ดำเนินการแก้ไขข้อมูลบริษัท ' + req.query.nameCompany 
          };
          client.multicast(root,
            [messageme, ]
          )
            .then(() => {
              res.json("success")
            }).catch((err) => {
              res.json(err)
            })
        } else {
          res.status(400).json({
            error: {
              "code": "400",
              "message": "ค่า lineid เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
              "detail": "Bad Request"
            }
          })
        }
      } else {
        res.status(400).json({
          error: {
            "code": "400",
            "message": "ค่า nameCompany เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
            "detail": "Bad Request"
          }
        })
      }
    } else {
      res.status(400).json({
        error: {
          "code": "400",
          "message": "ค่า imageCompany เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
          "detail": "Bad Request"
        }
      })
    }
  })
})//

exports.updateLeave_request = functions.firestore.document('company/{userid}').onUpdate(async (change, context) => {
  let name = change.before.data().nameCompany

  await db.collection('member').where("company", "==", name).get().then(function (querySnapshot) {
    if (querySnapshot.docs.length != 0) {
      querySnapshot.forEach(function (doc) {
        db.collection('member').doc(doc.id).update({
          company: change.after.data().nameCompany
        })
      })
    }
  })
  await db.collection('leave').where("leaveCompany", "==", name).get().then(function (querySnapshot) {
    if (querySnapshot.docs.length != 0) {
      querySnapshot.forEach(function (doc) {
        db.collection('leave').doc(doc.id).update({
          leaveCompany: change.after.data().nameCompany
        })
      })
    }
  })
  await db.collection('leave_request').where("company", "==", name).get().then(function (querySnapshot) {
    if (querySnapshot.docs.length != 0) {
      querySnapshot.forEach(function (doc) {
        db.collection('leave_request').doc(doc.id).update({
          company: change.after.data().nameCompany
        })
      })
    }
  })
})//

exports.delcompany = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    let del = []
    let result = JSON.parse(req.query.data)
    // res.json(result.length)
    if (req.query.nameshow != "" && req.query.nameshow ) {
    if (req.query.data != "" && req.query.data ) {
      if (req.query.lineid != "" && req.query.lineid ) {
        const nameline = []
            let root = []
                await db.collection('member').where("lineid", "==", req.query.lineid).get()
                    .then(snapshot => {
                      snapshot.forEach((doc) => {
                        let status = []
                        if(doc.data().status == 4){
                          status.push("Admin")
                        }
                        if(doc.data().status == 5){
                          status.push("Super Admin")
                        }
                        nameline.push({
                          name: doc.data().pname + doc.data().fname + " " + doc.data().lname,status:status[0]
                        })
                      })
                      return
                    })
                    
                    await db.collection('member').where('status', '==', 5).get()
                        .then(snapshot => {
                          if (snapshot.docs.length != 0) {
                            snapshot.forEach((doc) => {
                              root.push(doc.data().lineid)
                            })
                          }
                          return
                        })
        for (let index = 0; index < result.length; index++) {
          await db.collection('company').where("nameCompany", "==", result[index]).get()
            .then(snapshot => {
              snapshot.forEach(function (doc) {
                del.push({
                  id: doc.id
                })
              })
            })
        }
        for (let index = 0; index < del.length; index++) {
            db.collection("company" ).doc(del[index].id).delete().then(function () {
              if (index == del.length-1) {
                const messageme = {
                  type: 'text',
                  text: nameline[0].name+' ('+nameline[0].status+') ได้ดำเนินการลบบริษัท ' + req.query.nameshow 
                };
                client.multicast(root,
                  [messageme, ]
                )
                  .then(() => {
                    res.json("success")
                  }).catch((err) => {
                    res.json(err)
                  })
              }
            }).catch(function (error) {
              res.json("Error removing document: ", error);
            })
          
        }
      } else {
        res.status(400).json({
          error: {
            "code": "400",
            "message": "ค่า lineid เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
            "detail": "Bad Request"
          }
        })
      }
    } else {
      res.status(400).json({
        error: {
          "code": "400",
          "message": "ค่า data เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
          "detail": "Bad Request"
        }
      })
    }
  } else {
    res.status(400).json({
      error: {
        "code": "400",
        "message": "ค่า nameshow เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
        "detail": "Bad Request"
      }
    })
  }
  })
})//

exports.deletecompany = functions.firestore.document('company/{userid}').onDelete(async (change, context) => {
  await db.collection('member').where("company", "==", change.data().nameCompany).get()
    .then(snapshot => {
      snapshot.forEach(function (doc) {
        db.collection('member').doc(doc.id).delete()
      })
    })
  await db.collection('leave').where("leaveCompany", "==", change.data().nameCompany).get()
    .then(snapshot => {
      snapshot.forEach(function (doc) {
        db.collection('leave').doc(doc.id).delete()
      })
    })
  await db.collection('leave_request').where("company", "==", change.data().nameCompany).get()
    .then(snapshot => {
      snapshot.forEach(function (doc) {
        db.collection('leave_request').doc(doc.id).delete()
      })
    })
})//

exports.delete_position = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    // res.json("sd")
    let del = []
    let result = JSON.parse(req.query.data)
    if (req.query.datashow != "" && req.query.datashow ) {
    if (req.query.lineid != "" && req.query.lineid ) {
      if (req.query.data != "" && req.query.data ) {
        if (req.query.positionCompany != "" && req.query.positionCompany ) {
          await db.collection('position').where("positionCompany", "==", req.query.positionCompany).get()
            .then(snapshot => {
              snapshot.forEach(function (doc) {
                for (let index = 0; index < result.length; index++) {
                  if (doc.data().positionType == result[index]) {
                    del.push({
                      id: doc.id
                    })
                  }
                }
              })
            })
          for (let index = 0; index < del.length; index++) {
            db.collection("position").doc(del[index].id).delete().then(async function () {
              let position = del.length - 1
              if (index == position) {
                const userid = req.query.lineid
                  const name = []
                  const adminP = []
                  const root = []
                await db.collection('member').where("lineid", "==", userid).get()
                    .then(snapshot => {
                      snapshot.forEach((doc) => {
                        let status = []
                        if(doc.data().status == 4){
                          status.push("Admin")
                        }
                        if(doc.data().status == 5){
                          status.push("Super Admin")
                        }
                        name.push({
                          name: doc.data().pname + doc.data().fname + " " + doc.data().lname,status:status[0]
                        })
                      })
                      return
                    })
                  await db.collection('member').where('status', '>=', 4).get()
                    .then(snapshot => {
                      if (snapshot.docs.length != 0) {
                        snapshot.forEach((doc) => {
                          if (doc.data().company == req.query.positionCompany && doc.data().lineid != req.query.lineid) {
                            adminP.push(doc.data().lineid)
                          }
                        })
                      }
                      return
                    })
                  await db.collection('member').where('status', '==', 5).get()
                    .then(snapshot => {
                      if (snapshot.docs.length != 0) {
                        snapshot.forEach((doc) => {
                          if(doc.data().lineid != req.query.lineid){
                          root.push(doc.data().lineid)
                          }
                        })
                      }
                      return
                    })
                    let datashow = req.query.datashow.replace(/,,/g, ',')
                  const messageme = {
                    type: 'text',
                    text: `${name[0].name} (${name[0].status}) ได้ดำเนินการลบตำแหน่งงาน ${datashow}`
                  };

                  if (adminP.length == 0) {
                    client.pushMessage(userid, messageme)
                      .then(() => {
                        client.multicast(root,
                            [messageme, ]
                          )
                          .then(() => {
                            res.status(200).json('success')
                          })
                          .catch((err) => {
                            res.json(err)
                          });
                      })
                      .catch((err) => {
                        res.json(err)
                      });
                  } else {
                    client.pushMessage(userid, messageme)
                      .then(() => {
                        client.multicast(adminP,
                            [messageme, ]
                          )
                          .then(() => {
                            res.status(200).json('success')
                          })
                          .catch((err) => {
                            res.json(err)
                          });
                      })
                      .catch((err) => {
                        res.json(err)
                      });
                  }
              }
            }).catch(function (error) {
              res.json("Error removing document: ", error);
            })
          }
        } else {
          res.status(400).json({
            error: {
              "code": "400",
              "message": "ค่า positionCompany เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
              "detail": "Bad Request"
            }
          })
        }
      } else {
        res.status(400).json({
          error: {
            "code": "400",
            "message": "ค่า data เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
            "detail": "Bad Request"
          }
        })
      }
    } else {
      res.status(400).json({
        error: {
          "code": "400",
          "message": "ค่า lineid เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
          "detail": "Bad Request"
        }
      })
    }
  } else {
    res.status(400).json({
      error: {
        "code": "400",
        "message": "ค่า datashow เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
        "detail": "Bad Request"
      }
    })
  }
  })
}) //

exports.deleteposition = functions.firestore.document('position/{userid}').onDelete(async (change, context) => {
  await db.collection('member').where("company", "==", change.data().positionCompany).get()
    .then(snapshot => {
      snapshot.forEach(function (doc) {
        if (doc.data().position === change.data().positionType) {
          db.collection('member').doc(doc.id).update({
          position: "-"
        });
        }
      })
    })
});

exports.changeposition = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.query.positionCompany != "" && req.query.positionCompany ) {
      if (req.query.positionType != "" && req.query.positionType ) {
          if (req.query.lineid != "" && req.query.lineid ) {
            if (req.query.id != "" && req.query.id ) {
                    db.collection('position').doc(req.query.id).update({
                      positionType: req.query.positionType,
                    }).then(async () => {
                      const userid = req.query.lineid
                      const name = []
                      const adminP = []
                      const root = []
                    await db.collection('member').where("lineid", "==", userid).get()
                        .then(snapshot => {
                          snapshot.forEach((doc) => {
                            let status = []
                            if(doc.data().status == 4){
                              status.push("Admin")
                            }
                            if(doc.data().status == 5){
                              status.push("Super Admin")
                            }
                            name.push({
                              name: doc.data().pname + doc.data().fname + " " + doc.data().lname,status:status[0]
                            })
                          })
                          return
                        })
                      await db.collection('member').where('status', '>=', 4).get()
                        .then(snapshot => {
                          if (snapshot.docs.length != 0) {
                            snapshot.forEach((doc) => {
                              if (doc.data().company == req.query.positionCompany && doc.data().lineid != req.query.lineid) {
                                adminP.push(doc.data().lineid)
                              }
                            })
                          }
                          return
                        })
                      await db.collection('member').where('status', '==', 5).get()
                        .then(snapshot => {
                          if (snapshot.docs.length != 0) {
                            snapshot.forEach((doc) => {
                              if(doc.data().lineid != req.query.lineid){
                              root.push(doc.data().lineid)
                              }
                            })
                          }
                          return
                        })
                      const messageme = {
                        type: 'text',
                        text: `${name[0].name} (${name[0].status}) ได้ดำเนินการแก้ไขตำแหน่งงาน ${req.query.positionType}`
                      };
    
                      if (adminP.length == 0) {
                        client.pushMessage(userid, messageme)
                          .then(() => {
                            client.multicast(root,
                                [messageme, ]
                              )
                              .then(() => {
                                res.status(200).json('success')
                              })
                              .catch((err) => {
                                res.json(err)
                              });
                          })
                          .catch((err) => {
                            res.json(err)
                          });
                      } else {
                        client.pushMessage(userid, messageme)
                          .then(() => {
                            client.multicast(adminP,
                                [messageme, ]
                              )
                              .then(() => {
                                res.status(200).json('success')
                              })
                              .catch((err) => {
                                res.json(err)
                              });
                          })
                          .catch((err) => {
                            res.json(err)
                          });
                      }
                    }).catch((err) => {
                      res.json('error ' + err)
                    })
                  } else {
                    res.status(400).json({
                      error: {
                        "code": "400",
                        "message": "ค่า id ของ position เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
                        "detail": "Bad Request"
                      }
                    })
                  }
                  } else {
                    res.status(400).json({
                      error: {
                        "code": "400",
                        "message": "ค่า lineid เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
                        "detail": "Bad Request"
                      }
                    })
                  }
      } else {
        res.status(400).json({
          error: {
            "code": "400",
            "message": "ค่า positionType เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
            "detail": "Bad Request"
          }
        })
      }
    } else {
      res.status(400).json({
        error: {
          "code": "400",
          "message": "ค่า positionCompany เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
          "detail": "Bad Request"
        }
      })
    }
  })
}) //

exports.editposition = functions.firestore.document('position/{userid}').onUpdate(async (change, context) => {
  let beforeName = change.before.data().positionType
  let afterName = change.after.data().positionType
  let company = change.before.data().positionCompany
  await  db.collection('member').where("company","==",company).get().then((snapshot)=>{
    if (snapshot.docs.length > 0) {
      snapshot.forEach(async function (doc) {
        if (doc.data().position === beforeName) {
          db.collection('member').doc(doc.id).update({
          position: afterName,
        }).then(() => {        
        }).catch((err)=>console.log("error :",err,doc.id)
        )
        }
      })
    }
  })
  
})

exports.addposition = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.query.positionType != "" && req.query.positionType ) {
      if (req.query.positionCompany != "" && req.query.positionCompany ) {
        if (req.query.lineid != "" && req.query.lineid ) {
          db.collection("position").add({
              positionType: req.query.positionType,
              positionCompany: req.query.positionCompany,
            })
            .then(async function () {
                  const userid = req.query.lineid
                  const name = []
                  const adminP = []
                  const root = []
                await db.collection('member').where("lineid", "==", userid).get()
                    .then(snapshot => {
                      snapshot.forEach((doc) => {
                        let status = []
                        if(doc.data().status == 4){
                          status.push("Admin")
                        }
                        if(doc.data().status == 5){
                          status.push("Super Admin")
                        }
                        name.push({
                          name: doc.data().pname + doc.data().fname + " " + doc.data().lname,status:status[0]
                        })
                      })
                      return
                    })
                  await db.collection('member').where('status', '>=', 4).get()
                    .then(snapshot => {
                      if (snapshot.docs.length != 0) {
                        snapshot.forEach((doc) => {
                          if (doc.data().company == req.query.positionCompany && doc.data().lineid != userid) {
                            adminP.push(doc.data().lineid)
                          }
                        })
                      }
                      return
                    })
                  await db.collection('member').where('status', '==', 5).get()
                    .then(snapshot => {
                      if (snapshot.docs.length != 0) {
                        snapshot.forEach((doc) => {
                          if(doc.data().lineid != userid){
                          root.push(doc.data().lineid)
                          }
                        })
                      }
                      return
                    })
                  const messageme = {
                    type: 'text',
                    text: `${name[0].name} (${name[0].status}) ได้ดำเนินการเพิ่มตำแหน่งงาน ${req.query.positionType}`
                  };

                  if (adminP.length == 0) {
                    client.pushMessage(userid, messageme)
                      .then(() => {
                        client.multicast(root,
                            [messageme, ]
                          )
                          .then(() => {
                            res.status(200).json('success')
                          })
                          .catch((err) => {
                            res.json(err)
                          });
                      })
                      .catch((err) => {
                        res.json(err)
                      });
                  } else {
                    client.pushMessage(userid, messageme)
                      .then(() => {
                        client.multicast(adminP,
                            [messageme, ]
                          )
                          .then(() => {
                            res.status(200).json('success')
                          })
                          .catch((err) => {
                            res.json(err)
                          });
                      })
                      .catch((err) => {
                        res.json(err)
                      });
                  }
                      }).catch((err) => {
                        res.json('error ' + err)
                      })
                    } else {
                      res.status(400).json({
                        error: {
                          "code": "400",
                          "message": "ค่า positionCompany เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
                          "detail": "Bad Request"
                        }
                      })
                    }
                  } else {
                    res.status(400).json({
                      error: {
                        "code": "400",
                        "message": "ค่า lineid เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
                        "detail": "Bad Request"
                      }
                    })
                  }
    } else {
      res.status(400).json({
        error: {
          "code": "400",
          "message": "ค่า positionType เป็นค่าว่างหรือไม่ได้ส่งค่ามา",
          "detail": "Bad Request"
        }
      })
    }
  })
}) //