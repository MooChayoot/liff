const functions = require('firebase-functions');
const admin = require('firebase-admin')
const line = require('@line/bot-sdk');
admin.initializeApp({
  credential: admin.credential.applicationDefault()
})
var db = admin.firestore()
const client = new line.Client({
  channelAccessToken: 'kQGDO719f0NvhloM0EPkwIetITNdRMM+1HzKtzqNDp1PCbVnSg177WCFWJoWdy9oc5JdKc1eBVuGG7eaRwAK9a5UMx2BUvEq9d0nJRp7k4ENSGGsu4yargbHbazLBTs977zbs9c1cConqR0+g/Mu0lGUYhWQfeY8sLGRXgo3xvw='
});
const cors = require('cors')({
  origin: true
});
// res.json(querySnapshot.docs.length)
//---------------------------------All-Api-Display-------------------------------------\\
exports.displayprofile_lineid = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    db.collection('member').where("lineid", "==", req.query.lineid).get()
      .then(function (querySnapshot) {
        // res.json(querySnapshot.docs.length )
        if (querySnapshot.docs.length != 0) {
          querySnapshot.forEach(async function (doc) {
            res.status(200).json(doc.data())
          })
        } else {
          res.status(404).json({
            'error': 'ไม่พบข้อมูล'
          })
        }
      })
  })
})

exports.allowofuser = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    let allow_wait = []
    let allow_complete = []
    await db.collection('leave_request').where("lineid", "==", req.query.lineid).get()
      .then(function (querySnapshot) {
        // res.json(querySnapshot.docs.length )
        if (querySnapshot.docs.length != 0) {
          querySnapshot.forEach(async function (doc) {
            if (doc.data().status == 0) {
              allow_wait.push(doc.data())
            } else {
              allow_complete.push(doc.data())
            }
          })
        } else {
          res.status(404).json({
            'error': 'ไม่พบข้อมูล'
          })
        }
      })
    res.status(200).json({
      allow_wait: allow_wait,
      allow_complete: allow_complete
    })
  })
}) //เพิ่มการจำกัดการเรียกข้อมูล

exports.allowofhr = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    let allow_not = []
    let allow_complete = []
    await db.collection('leave_request').where("company", "==", req.query.company).get()
      .then(function (querySnapshot) {
        // res.json(querySnapshot.docs.length )
        if (querySnapshot.docs.length != 0) {
          querySnapshot.forEach(async function (doc) {
            if (doc.data().status == 1) {
              allow_not.push(doc.data())
            }
            if (doc.data().status == 2) {
              allow_complete.push(doc.data())
            }
          })
        } else {
          res.status(404).json({
            'error': 'ไม่พบข้อมูล'
          })
        }
      })
    res.status(200).json({
      allow_not: allow_not,
      allow_complete: allow_complete
    })
  })
}) //เพิ่มการจำกัดการเรียกข้อมูล

exports.showone_leave_request = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    let id = req.query.id
    db.collection('leave_request').doc(id).get()
      .then(function (doc) {
          res.status(200).json(doc.data())
      })
  })
}) 


//--------------------------All-Api-Create-Update-Delete--------------------------------\\
exports.allowleave_request = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    let id = req.query.id
    let allowstatus = parseInt(req.query.allowstatus)
    if (allowstatus == 1) {
      db.collection('leave_request').doc(id).get().then((doc) => {
        db.collection('leave_request').doc(id).update({
          status: 1
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
                  if (doc.data().company === name[0].company) {
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
            text: 'ผู้ดูแลระบบ ไม่อนุมัติการลา'
          };
          const messageadmin = {
            type: 'text',
            text: 'ไม่อนุมัติการลาของนาย ' + name[0].name
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
                    .catch((err) => {});
                })
                .catch((err) => {});
            } else {
              client.pushMessage(userid, messageme)
                .then(() => {
                  client.multicast(adminP,
                      [messageadmin, ]
                    )
                    .then(() => {
                      res.status(200).json('success')
                    })
                    .catch((err) => {});
                })
                .catch((err) => {});
            }
          }
        }).catch((err) => {
          err
        })
      })
    } else {
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
                  if (doc.data().company === name[0].company) {
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
            text: 'ผู้ดูแลระบบ อนุมัติการลา'
          };
          const messageadmin = {
            type: 'text',
            text: 'อนุมันติการลาของ ' + name[0].name
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
                    .catch((err) => {});
                })
                .catch((err) => {});
            } else {
              client.pushMessage(userid, messageme)
                .then(() => {
                  client.multicast(adminP,
                      [messageadmin, ]
                    )
                    .then(() => {
                      res.status(200).json('success')
                    })
                    .catch((err) => {});
                })
                .catch((err) => {});
            }
          }
        }).catch((err) => {
          err
        })
      })
    }
  })
})

exports.allowlogin = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    let name = []
    let allowstatus = parseInt(req.query.allowstatus)
    if (allowstatus == 1) {
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
                      if (doc.data().company === name[0].company) {
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
                text: 'คุณได้รับอนุมัติให้เข้าสู่ระบบ'
              };
              const messageadmin = {
                type: 'text',
                text: `คุณอนุมัติให้ ${name[0].name} ${doc.data().company} เข้าใช้งานระบบ`
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
                        err
                      });
                  })
                  .catch((err) => {
                    err
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
                        err
                      });
                  })
                  .catch((err) => {
                    err
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
            let sumstatus = doc.data().status - 1
            let balance = 3 + sumstatus
            db.collection('member').doc(doc.id).update({
              status: sumstatus
            }).then(async () => {
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
                        if (doc.data().company === name[0].company) {
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
                  text: 'คุณไม่ได้รับอนุมัติให้เข้าสู่ระบบ กรุณายืนยันตัวอีกครั้ง สามรถยืนยันตัวได้อีก ' + balance + 'ครั้ง'
                };
                const messageadmin = {
                  type: 'text',
                  text: `ผู้ดูแลไม่อนุมัติให้ ${name[0].name} ${doc.data().company} เข้าใช้งานระบบ`
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
                          err
                        });
                    })
                    .catch((err) => {
                      err
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
                          err
                        });
                    })
                    .catch((err) => {
                      err
                    });
                }
              } else {
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
                        if (doc.data().company === name[0].company) {
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
                  text: 'คุณไม่ได้รับอนุมัติให้เข้าสู่ระบบ และไม่สามารถยืนยันตัวได้อีก'
                };
                const messageadmin = {
                  type: 'text',
                  text: `ผู้ดูแลไม่อนุมัติให้ ${name[0].name} ${doc.data().company} เข้าใช้งานระบบ`
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
                          err
                        });
                    })
                    .catch((err) => {
                      err
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
                          err
                        });
                    })
                    .catch((err) => {
                      err
                    });
                }
              }
            })
          })
        })
    }
  })
})

exports.delete_leave = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    let del = []
    let result = JSON.parse(req.query.data)
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
      db.collection("leave").doc(del[index].id).delete().then(function () {
        let position = del.length - 1
        if (index === position) {
          const messageme = {
            type: 'text',
            text: `ลบ  ${req.query.data} เสร็จสิ้น`
          };
          client.pushMessage(req.query.lineid, messageme)
            .then(() => {
              res.status(200).json('success')
            })
            .catch((err) => {
              res.json(err)
            })
        }
      }).catch(function (error) {
        res.json("Error removing document: ", error);
      })
    }
  })
})

exports.deleteleave = functions.firestore.document('leave/{userid}').onDelete(async (change, context) => {
  await db.collection('member').where("company", "==", change.data().leaveCompany).get()
    .then(snapshot => {
      snapshot.forEach(function (doc) {
        let dataleave = []
        let i = doc.data().leave.length
        for (let index = 0; index < i; index++) {
          if (doc.data().leave[index].leaveType !== change.data().leaveType) {
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
    await db.collection('leave').where("leaveCompany", "==", req.query.leaveCompany).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(async function (doc) {
          if (doc.data().leaveType === req.query.leaveType) {
            let sum = parseInt(req.query.leaveDay) - doc.data().leaveDay
            leave.push({
              sum: sum,
              type: req.query.leaveType
            })
            db.collection('leave').doc(doc.id).update({
              leaveType: doc.data().leaveType,
              leaveDay: parseInt(req.query.leaveDay),
              leaveCompany: doc.data().leaveCompany
            }).then(async () => {
              //  res.json("sub")
              let sum = []
              await db.collection('member').where("company", "==", req.query.leaveCompany).get()
                .then(function (querySnapshot) {
                  if (querySnapshot.docs.length != 0) {
                    querySnapshot.forEach(function (doc) {
                      let dataleave = []
                      let i = doc.data().leave.length
                      for (let index = 0; index < i; index++) {
                        if (doc.data().leave[index].leaveType !== leave[0].type) {
                          dataleave.push(doc.data().leave[index])
                        } else {
                          let sumDay = doc.data().leave[index].leaveDay + leave[0].sum
                          if (sumDay <= 0) {
                            let sumDay = 0
                            dataleave.push({
                              leaveType: leave[0].type,
                              leaveDay: sumDay
                            })
                          } else {
                            dataleave.push({
                              leaveType: leave[0].type,
                              leaveDay: sumDay
                            })
                          }
                        }
                      }
                      db.collection('member').doc(doc.id).update({
                        leave: dataleave
                      }).then(async () => {
                        await sum.unshift("0")
                        if (querySnapshot.docs.length == sum.length) {
                          const messageme = {
                            type: 'text',
                            text: `แก้ไข ${req.query.leaveType} เสร็จสิ้น`
                          };
                          client.pushMessage(req.query.lineid, messageme)
                            .then(() => {
                              res.status(200).json('success')
                            })
                            .catch((err) => {
                              res.json(err)
                            })
                        }
                      }).catch((err) => {
                        res.json('error ' + err)
                      })
                    })
                  } else {
                    const messageme = {
                      type: 'text',
                      text: `แก้ไข ${req.query.leaveType} เสร็จสิ้น`
                    };
                    client.pushMessage(req.query.lineid, messageme)
                      .then(() => {
                        res.status(200).json('success')
                      })
                      .catch((err) => {
                        res.json(err)
                      })
                  }
                })
            }).catch((err) => {
              res.json('error ' + err)
            })
          }
        })
      })
  })
})

exports.addleave = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    db.collection("leave").add({
        leaveType: req.query.leaveType,
        leaveDay: parseInt(req.query.leaveDay),
        leaveCompany: req.query.leaveCompany,
      })
      .then(function () {
        let sum = []
        db.collection('member').where("company", "==", req.query.leaveCompany).get()
          .then(snapshot => {
            if (snapshot.docs.length != 0) {
              snapshot.forEach(function (doc) {
                let dataleave = [{
                  leaveType: req.query.leaveType,
                  leaveDay: parseInt(req.query.leaveDay)
                }]
                let i = doc.data().leave.length
                for (let index = 0; index < i; index++) {
                  dataleave.push(doc.data().leave[index])
                }
                db.collection('member').doc(doc.id).update({
                  leave: dataleave
                }).then(async () => {
                  await sum.unshift("0")
                  if (snapshot.docs.length == sum.length) {
                    const messageme = {
                      type: 'text',
                      text: `เพิ่ม ${req.query.leaveType} เสร็จสิ้น`
                    };
                    client.pushMessage(req.query.lineid, messageme)
                      .then(() => {
                        res.status(200).json('success')
                      })
                      .catch((err) => {
                        res.json(err)
                      })
                  }
                }).catch((err) => {
                  res.json('error ' + err)
                })
              })
            } else {
              const messageme = {
                type: 'text',
                text: `เพิ่ม ${req.query.leaveType} เสร็จสิ้น`
              };
              client.pushMessage(req.query.lineid, messageme)
                .then(() => {
                  res.status(200).json('success')
                })
                .catch((err) => {
                  res.json(err)
                })
            }
          })
      })
  })
})

exports.adduser = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const leave = []
    await db.collection('leave').get().then(snapshot => {
      snapshot.forEach((doc) => {
        if (doc.data().leaveCompany === req.query.company) {
          leave.push({
            leaveType: doc.data().leaveType,
            leaveDay: doc.data().leaveDay
          })
        }
      })
      return
    })
    let date_ob = Date.now();
    db.collection("member").add({
        lineid: req.query.lineid,
        img: req.query.img,
        pname: req.query.pname,
        fname: req.query.fname,
        lname: req.query.lname,
        nname: req.query.nname,
        tel: req.query.tel,
        position: req.query.position,
        company: req.query.company,
        status: 0,
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
                if (doc.data().company === name[0].company) {
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
          text: 'กรุณารอสักครู่ ระบบได้ส่งคำขอการเข้าสู่ระบบไปยังผู้มีสิทธิในการอนุมัติเรียบร้อยแล้ว'
        };
        const messageadmin = {
          type: 'text',
          text: name[0].name + ' ได้ส่งคำขอการเข้าสู่ระบบ กรุณาตรวจสอบ https://liff.line.me/1653709753-ZLy18V9a'
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
                  .catch((err) => {});
              })
              .catch((err) => {});
          } else {
            client.pushMessage(userid, messageme)
              .then(() => {
                client.multicast(adminP,
                    [messageadmin, ]
                  )
                  .then(() => {
                    res.status(200).json('success')
                  })
                  .catch((err) => {});
              })
              .catch((err) => {});
          }
        } else {
          const messageme = {
            type: 'text',
            text: 'กรุณารอสักครู่ ระบบได้ส่งคำขอการเข้าสู่ระบบไปยังผู้มีสิทธิในการอนุมัติเรียบร้อยแล้ว'
          };
          client.pushMessage(userid, messageme)
            .then(() => {
              res.status(200).json('success')
            })
            .catch((err) => {
              err
            });
        }
      })
  })
})

exports.deluser = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    let del = []
    let name = []
    db.collection('member').where("lineid", "==", req.query.userid).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          name.push({
            name: doc.data().pname + doc.data().fname + " " + doc.data().lname,
            company: doc.data().company
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
                // else{res.json("aaaa")}
              }).catch(function (error) {
                res.json("Error removing document: ", error);
              })
            if (del.length != 0) {
              // res.json("me")
              for (let index = 0; index < del.length; index++) {
                db.collection("leave_request").doc(del[index].id).delete().then(function () {
                  let position = del.length - 1
                  if (index === position) {
                    const messageme = {
                      type: 'text',
                      text: 'ผู้ดูแลระบบ ได้ลบบัญชีคุณ'
                    };
                    const messageadmin = {
                      type: 'text',
                      text: `คุณได้ลบบัญชี ${name[0].name} ${doc.data().company} เสร็จสิ้น`
                    };
                    client.pushMessage(req.query.userid, messageme)
                      .then(() => {
                        client.pushMessage(req.query.lineid, messageadmin)
                          .then(() => {
                            res.json("success")
                          })
                          .catch((err) => {
                            err
                          });
                      })
                  }
                }).catch(function (error) {
                  res.json("Error removing document: ", error);
                })
              }
            } else {
              const messageme = {
                type: 'text',
                text: 'ผู้ดูแลระบบ ได้ลบบัญชีคุณ'
              };
              const messageadmin = {
                type: 'text',
                text: `คุณได้ลบบัญชี ${name[0].name} ${doc.data().company} เสร็จสิ้น`
              };
              client.pushMessage(req.query.userid, messageme)
                .then(() => {
                  client.pushMessage(req.query.lineid, messageadmin)
                    .then(() => {
                      res.json("success")
                    })
                    .catch((err) => {
                      err
                    });
                })
              // res.json("success")
            }
          }).catch((err) => {
            err
          })
        })
      })
  })
})

exports.changeuser = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    let date_ob = Date.now();
    if (req.query.userid == req.query.lineid) {
      db.collection('member').where("lineid", "==", req.query.userid).get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            db.collection('member').doc(doc.id).update({
              fname: req.query.fname,
              lname: req.query.lname,
              nname: req.query.nname,
              tel: req.query.tel,
              position: req.query.position,
              editAt: date_ob,
            }).then(() => {
              const messageme = {
                type: 'text',
                text: 'คุณได้แก้ไขข้อมูลส่วนตัว'
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
              status: parseInt(req.query.status),
              editAt: date_ob,
            }).then(() => {
              if (doc.data().status == parseInt(req.query.status)) {
                const messageme = {
                  type: 'text',
                  text: 'ผู้ดูแลระบบ ได้ทำการแก้ไขข้อมูลของคุณ'
                };
                const messageadmin = {
                  type: 'text',
                  text: `คุณได้แก้ไขข้อมูลของ ${name[0].name} ${doc.data().company} เสร็จสิ้น`
                };
                client.pushMessage(req.query.userid, messageme)
                  .then(() => {
                    client.pushMessage(req.query.lineid, messageadmin)
                      .then(() => {
                        res.status(200).json('success')
                      })
                      .catch((err) => {
                        err
                      });
                  })
                  .catch((err) => {
                    err
                  });
              } else {
                if (parseInt(req.query.status) == 1) {
                  const messageme = {
                    type: 'text',
                    text: 'ผู้ดูแลระบบ ได้ทำการแก้ไขข้อมูลของคุณ'
                  };
                  const messageadmin = {
                    type: 'text',
                    text: `คุณได้แก้ไขข้อมูลของ ${name[0].name} ${doc.data().company} เป็น User เสร็จสิ้น`
                  };
                  client.pushMessage(req.query.userid, messageme)
                    .then(() => {
                      client.pushMessage(req.query.lineid, messageadmin)
                        .then(() => {
                          res.status(200).json('success')
                        })
                        .catch((err) => {
                          err
                        });
                    })
                    .catch((err) => {
                      err
                    });
                }
                if (parseInt(req.query.status) == 2) {
                  const messageme = {
                    type: 'text',
                    text: 'ผู้ดูแลระบบ ได้ทำการแก้ไขข้อมูลของคุณ'
                  };
                  const messageadmin = {
                    type: 'text',
                    text: `คุณได้แก้ไขข้อมูลของ ${name[0].name} ${doc.data().company} เป็น HR เสร็จสิ้น`
                  };
                  client.pushMessage(req.query.userid, messageme)
                    .then(() => {
                      client.pushMessage(req.query.lineid, messageadmin)
                        .then(() => {
                          res.status(200).json('success')
                        })
                        .catch((err) => {
                          err
                        });
                    })
                    .catch((err) => {
                      err
                    });
                }
                if (parseInt(req.query.status) == 3) {
                  const messageme = {
                    type: 'text',
                    text: 'ผู้ดูแลระบบ ได้ทำการแก้ไขข้อมูลของคุณ'
                  };
                  const messageadmin = {
                    type: 'text',
                    text: `คุณได้แก้ไขข้อมูลของ ${name[0].name} ${doc.data().company} เป็น Super HR เสร็จสิ้น`
                  };
                  client.pushMessage(req.query.userid, messageme)
                    .then(() => {
                      client.pushMessage(req.query.lineid, messageadmin)
                        .then(() => {
                          res.status(200).json('success')
                        })
                        .catch((err) => {
                          err
                        });
                    })
                    .catch((err) => {
                      err
                    });
                }
                if (parseInt(req.query.status) == 4) {
                  const messageme = {
                    type: 'text',
                    text: 'ผู้ดูแลระบบ ได้ทำการแก้ไขข้อมูลของคุณ'
                  };
                  const messageadmin = {
                    type: 'text',
                    text: `คุณได้แก้ไขข้อมูลของ ${name[0].name} ${doc.data().company} เป็น Amin ของบริษัท ${doc.data().company} เสร็จสิ้น`
                  };
                  client.pushMessage(req.query.userid, messageme)
                    .then(() => {
                      client.pushMessage(req.query.lineid, messageadmin)
                        .then(() => {
                          res.status(200).json('success')
                        })
                        .catch((err) => {
                          err
                        });
                    })
                    .catch((err) => {
                      err
                    });
                }
              }
            }).catch((err) => {
              res.json('error ' + err)
            })
          })
        })
    }
  })
})

exports.addleave_request = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    let date_ob = Date.now();
    let dataleave = []
    let id = []
    let root = []
    if (req.query.file !== "") {
      let newStr = req.query.file.substring(req.query.file.length - 3, req.query.file.length)
      if (newStr == "pdf") {
        db.collection("leave_request").add({
          lineid: req.query.lineid,
          leaveType: req.query.leaveType,
          leaveSum: parseInt(req.query.leaveSum),
          dateStart: req.query.dateStart,
          dateEnd: req.query.dateEnd,
          timeStart: req.query.timeStart,
          timeEnd: req.query.timeEnd,
          noteMe: req.query.noteMe,
          company: req.query.company,
          file: "https://firebasestorage.googleapis.com/v0/b/twin-hr.appspot.com/o/certificate%2Ffile%2F" + req.query.file + "?alt=media",
          status: 0,
          noteAdmin: ".",
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
                if (doc.data().leave[index].leaveType === req.query.leaveType) {
                  let sunday = doc.data().leave[index].leaveDay - parseInt(req.query.leaveSum)
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
                    if (doc.data().company === name[0].company) {
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
              text: 'กรุณารอสักครู่ ระบบได้ส่งคำขอลางานไปยังผู้มีสิทธิในการอนุมัติเรียบร้อยแล้ว'
            };
            const messageadmin = {
              type: 'text',
              text: name[0].name + ' ได้ส่งคำขอการการลางาน กรุณาตรวจสอบ https://liff.line.me/1653709753-ZLy18V9a'
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
                      .catch((err) => {});
                  })
                  .catch((err) => {});
              } else {
                client.pushMessage(userid, messageme)
                  .then(() => {
                    client.multicast(adminP,
                        [messageadmin, ]
                      )
                      .then(() => {
                        res.status(200).json('success')
                      })
                      .catch((err) => {});
                  })
                  .catch((err) => {});
              }
            } else {
              const messageme = {
                type: 'text',
                text: 'กรุณารอสักครู่ ระบบได้ส่งคำขอลางานไปยังผู้มีสิทธิในการอนุมัติเรียบร้อยแล้ว'
              };
              client.pushMessage(userid, messageme)
                .then(() => {
                  res.status(200).json('success')
                })
                .catch((err) => {
                  err
                });
            }
          }).catch(function (err) {
            res.json('error' + err)
          })
        })
      } else if (newStr == "jpg") {
        db.collection("leave_request").add({
          lineid: req.query.lineid,
          leaveType: req.query.leaveType,
          leaveSum: parseInt(req.query.leaveSum),
          dateStart: req.query.dateStart,
          dateEnd: req.query.dateEnd,
          timeStart: req.query.timeStart,
          timeEnd: req.query.timeEnd,
          noteMe: req.query.noteMe,
          company: req.query.company,
          file: "https://firebasestorage.googleapis.com/v0/b/twin-hr.appspot.com/o/certificate%2Fimage%2F" + req.query.file + "?alt=media",
          status: 0,
          noteAdmin: ".",
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
                if (doc.data().leave[index].leaveType === req.query.leaveType) {
                  let sunday = doc.data().leave[index].leaveDay - parseInt(req.query.leaveSum)
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
                    if (doc.data().company === name[0].company) {
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
              text: 'กรุณารอสักครู่ ระบบได้ส่งคำขอลางานไปยังผู้มีสิทธิในการอนุมัติเรียบร้อยแล้ว'
            };
            const messageadmin = {
              type: 'text',
              text: name[0].name + ' ได้ส่งคำขอการการลางาน กรุณาตรวจสอบ https://liff.line.me/1653709753-ZLy18V9a'
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
                      .catch((err) => {});
                  })
                  .catch((err) => {});
              } else {
                client.pushMessage(userid, messageme)
                  .then(() => {
                    client.multicast(adminP,
                        [messageadmin, ]
                      )
                      .then(() => {
                        res.status(200).json('success')
                      })
                      .catch((err) => {});
                  })
                  .catch((err) => {});
              }
            } else {
              const messageme = {
                type: 'text',
                text: 'กรุณารอสักครู่ ระบบได้ส่งคำขอลางานไปยังผู้มีสิทธิในการอนุมัติเรียบร้อยแล้ว'
              };
              client.pushMessage(userid, messageme)
                .then(() => {
                  res.status(200).json('success')
                })
                .catch((err) => {
                  err
                });
            }
          }).catch(function (err) {
            res.json('error' + err)
          })
        })
      } else {
        res.json("อัพไฟล์ .pdf หรือ .jpg เท่านั้น")
      }
    } else {
      db.collection("leave_request").add({
        lineid: req.query.lineid,
        leaveType: req.query.leaveType,
        leaveSum: parseInt(req.query.leaveSum),
        dateStart: req.query.dateStart,
        dateEnd: req.query.dateEnd,
        timeStart: req.query.timeStart,
        timeEnd: req.query.timeEnd,
        noteMe: req.query.noteMe,
        company: req.query.company,
        file: req.query.file,
        status: 0,
        noteAdmin: ".",
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
              if (doc.data().leave[index].leaveType === req.query.leaveType) {
                let sunday = doc.data().leave[index].leaveDay - parseInt(req.query.leaveSum)
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
                  if (doc.data().company === name[0].company) {
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
            text: 'กรุณารอสักครู่ ระบบได้ส่งคำขอลางานไปยังผู้มีสิทธิในการอนุมัติเรียบร้อยแล้ว'
          };
          const messageadmin = {
            type: 'text',
            text: name[0].name + ' ได้ส่งคำขอการการลางาน กรุณาตรวจสอบ https://liff.line.me/1653709753-ZLy18V9a'
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
                    .catch((err) => {});
                })
                .catch((err) => {});
            } else {
              client.pushMessage(userid, messageme)
                .then(() => {
                  client.multicast(adminP,
                      [messageadmin, ]
                    )
                    .then(() => {
                      res.status(200).json('success')
                    })
                    .catch((err) => {});
                })
                .catch((err) => {});
            }
          } else {
            const messageme = {
              type: 'text',
              text: 'กรุณารอสักครู่ ระบบได้ส่งคำขอลางานไปยังผู้มีสิทธิในการอนุมัติเรียบร้อยแล้ว'
            };
            client.pushMessage(userid, messageme)
              .then(() => {
                res.status(200).json('success')
              })
              .catch((err) => {
                err
              });
          }
        }).catch(function (err) {
          res.json('error' + err)
        })
      })
    }
  })
})

exports.delleave_request = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    let leave = []
    let id = req.query.id
    var docRef = db.collection("leave_request").doc(id);
    docRef.get().then(function (docleave) {
      db.collection("leave_request").doc(req.query.id).delete().then(function () {
        // res.json({data:doc.data(),id:id})
        db.collection("member").where("lineid", "==", docleave.data().lineid).get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              for (let index = 0; index < doc.data().leave.length; index++) {
                if (docleave.data().leaveType === doc.data().leave[index].leaveType) {
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
                res.json("success")
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
  })
})

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
          if (doc.data().company === name[0].company) {
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
    text: 'คุณได้ยกเลิกการลา'
  };
  const messageadmin = {
    type: 'text',
    text: name[0].name + ' ' + name[0].company + ' ได้ยกเลิกการลางาน'
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
            .catch((err) => {});
        })
        .catch((err) => {});
    } else {
      client.pushMessage(userid, messageme)
        .then(() => {
          client.multicast(adminP,
              [messageadmin, ]
            )
            .then(() => {
              res.status(200).json('success')
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    }
  } else {
    const messageme = {
      type: 'text',
      text: 'คุณได้ยกเลิกการลา'
    };
    client.pushMessage(userid, messageme)
      .then(() => {
        res.status(200).json('success')
      })
      .catch((err) => {
        err
      });
  }
})

exports.changeleave_request = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    let newStr = req.query.file.substring(req.query.file.length - 3, req.query.file.length)
    db.collection('leave_request').doc(req.query.id).get().then(function (docleave) {
      if (newStr == "pdf") {
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
                  if (doc.data().company === name[0].company) {
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
            text: 'ทำการเพิ่มเติมแนบไฟล์เรียบร้อยแล้ว'
          };
          const messageadmin = {
            type: 'text',
            text: name[0].name + ' ' + name[0].company + ' ได้ทำการแนบไฟล์เพิ่มเติม'
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
                    .catch((err) => {});
                })
                .catch((err) => {});
            } else {
              client.pushMessage(userid, messageme)
                .then(() => {
                  client.multicast(adminP,
                      [messageadmin, ]
                    )
                    .then(() => {
                      res.status(200).json('success')
                    })
                    .catch((err) => {});
                })
                .catch((err) => {});
            }
          } else {
            const messageme = {
              type: 'text',
              text: 'ทำการเพิ่มเติมแนบไฟล์เรียบร้อยแล้ว'
            };
            client.pushMessage(userid, messageme)
              .then(() => {
                res.status(200).json('success')
              })
              .catch((err) => {
                err
              });
          }
        }).catch((err) => {
          res.json('error ' + err)
        })
      } else if (newStr == "jpg") {
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
                  if (doc.data().company === name[0].company) {
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
            text: 'ทำการเพิ่มเติมแนบไฟล์เรียบร้อยแล้ว'
          };
          const messageadmin = {
            type: 'text',
            text: name[0].name + ' ' + name[0].company + ' ได้ทำการแนบไฟล์เพิ่มเติม'
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
                    .catch((err) => {});
                })
                .catch((err) => {});
            } else {
              client.pushMessage(userid, messageme)
                .then(() => {
                  client.multicast(adminP,
                      [messageadmin, ]
                    )
                    .then(() => {
                      res.status(200).json('success')
                    })
                    .catch((err) => {});
                })
                .catch((err) => {});
            }
          } else {
            const messageme = {
              type: 'text',
              text: 'ทำการเพิ่มเติมแนบไฟล์เรียบร้อยแล้ว'
            };
            client.pushMessage(userid, messageme)
              .then(() => {
                res.status(200).json('success')
              })
              .catch((err) => {
                err
              });
          }
        }).catch((err) => {
          res.json('error ' + err)
        })
      } else {
        res.json("อัพไฟล์ .pdf หรือ .jpg เท่านั้น")
      }
    })
  })
})

exports.addcompany = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    let newStr = req.query.imageCompany.substring(req.query.imageCompany.length - 3, req.query.imageCompany.length)
    if (newStr == "jpg") {
      db.collection("company").add({
          nameCompany: req.query.nameCompany,
          imageCompany: `https://firebasestorage.googleapis.com/v0/b/twin-hr.appspot.com/o/company%2F${req.query.imageCompany}?alt=media`,
        })
        .then(function () {
          const messageme = {
            type: 'text',
            text: 'ทำการเพิ่ม บริษัท ' + req.query.nameCompany + ' เสร็จสิ้น'
          };
          client.pushMessage(req.query.lineid, messageme)
            .then(() => {
              res.json("success")
            }).catch((err) => {
              res.json(err)
            })
        })
    } else {
      res.json("อัพโหลดได้เฉพาะไฟล์ .jpg")
    }
  })
})

exports.changecompany = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    let oldname = []
    if (req.query.nameCompany !== "") {
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
    if (req.query.imageCompany !== "") {
      let newStr = req.query.imageCompany.substring(req.query.imageCompany.length - 3, req.query.imageCompany.length)
      if (newStr === "jpg") {
        db.collection("company").doc(req.query.id).update({
            imageCompany: "https://firebasestorage.googleapis.com/v0/b/twin-hr.appspot.com/o/company%2F" + req.query.imageCompany + "?alt=media",
          })
          .then(function () {
            res.json("success")
          })
      } else {
        res.json("อัพโหลดได้เฉพาะไฟล์ .jpg")
      }
    }
    const messageme = {
      type: 'text',
      text: 'ทำการแก้ไข บริษัท ' + req.query.nameCompany + ' เสร็จสิ้น'
    };
    client.pushMessage(req.query.lineid, messageme)
      .then(() => {
        res.json("success")
      }).catch((err) => {
        res.json(err)
      })
  })
})

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
})

exports.delcompany = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    let del = []
    let result = JSON.parse(req.query.data)
    // res.json(result.length)
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
      db.collection("company").doc(del[index].id).delete().then(function () {
        let position = del.length - 1
        if (index === position) {
          res.json("Document successfully deleted!");
        }
      }).catch(function (error) {
        res.json("Error removing document: ", error);
      })
    }
  })
})

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
  const messageme = {
    type: 'text',
    text: 'ทำการลบ บริษัท ' + change.data().nameCompany + ' เสร็จสิ้น'
  };
  client.pushMessage(req.query.lineid, messageme)
    .then(() => {
      res.json("success")
    }).catch((err) => {
      res.json(err)
    })
})