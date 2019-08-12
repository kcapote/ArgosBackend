const {
  Floor,
  Department,
  Task,
  SubTask,
  DepartmentTask,
  DepartmentSubTask,
  CommonService,
  CommonServiceTask,
  CommonServiceSubTask
} = require("../models");


//router.post('/floors', [authentication.verifyToken, authentication.refreshToken],
const saveFloors = (req, res, next) => {
  let collection = req.body;
  console.log(req.body);

  for (let k = 0; k < collection.length; k++) {
    let floor = new Floor({
      project: collection[k].project,
      number: collection[k].number,
      quantityDepartment: collection[k].quantityDepartment,
      type: collection[k].type,
      status: 0
    });
    floor.save((err, floor) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "No se puede crear el piso",
          errors: err,
          user: req.user
        });
      } else {
        for (let i = 0; i < floor.quantityDepartment; i++) {
          let department = new Department({
            floor: floor._id,
            number: i + 1,
            status: 0
          });
          department.save((err, department) => {
            if (err) {
              return res.status(400).json({
                success: false,
                message: "No se puede crear el departamento",
                errors: err,
                user: req.user
              });
            } else {
              Task.find({ type: "DEPARTAMENTOS", recordActive: true })
                .sort({ position: 1 })
                .exec((err, tasks) => {
                  if (err) {
                    return res.status(500).json({
                      success: false,
                      message: "No se pueden consultar las tareas",
                      errors: err,
                      user: req.user
                    });
                  } else {
                    tasks.forEach(task => {
                      let departmentTask = new DepartmentTask({
                        department: department._id,
                        task: task._id,
                        floor: floor._id,
                        project: floor.project,
                        status: 0
                      });
                      departmentTask.save((err, departmentTask) => {
                        if (err) {
                          return res.status(400).json({
                            success: false,
                            message: "No se puede guardar el registro",
                            errors: err,
                            user: req.user
                          });
                        } else {
                          SubTask.find({ task: task._id, recordActive: true })
                            .populate("task")
                            .exec((err, subTasks) => {
                              if (err) {
                                return res.status(500).json({
                                  success: false,
                                  message: "No se pueden consultar las tareas",
                                  errors: err,
                                  user: req.user
                                });
                              } else {
                                subTasks.forEach(subTaskElement => {
                                  let departmentSubTask = new DepartmentSubTask(
                                    {
                                      department: department._id,
                                      subTask: subTaskElement._id,
                                      task: task._id,
                                      floor: floor._id,
                                      project: floor.project,
                                      status: 0
                                    }
                                  );
                                  departmentSubTask.save(
                                    (err, departmentSubTask) => {
                                      if (err) {
                                        return res.status(400).json({
                                          success: false,
                                          message:
                                            "No se puede guardar el registro",
                                          errors: err,
                                          user: req.user
                                        });
                                      } else {
                                      }
                                    }
                                  );
                                });
                              }
                            });
                        }
                      });
                    });
                  }
                });
            }
          });
        }
      }
    });
  }

  res.status(200).json({
    success: true,
    message: "Operación realizada de forma exitosa.",
    user: req.user
  });
};

//router.post('/commonServices', [authentication.verifyToken, authentication.refreshToken],
const saveCommonService = (req, res, next) => {
  let collection = req.body;
  for (let k = 0; k < collection.length; k++) {
    let commonService = new CommonService({
      project: collection[k].project,
      number: collection[k].number,
      type: collection[k].type,
      status: 0
    });
    commonService.save((err, commonService) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "No se puede crear el piso",
          errors: err,
          user: req.user
        });
      } else {
        Task.find({ type: commonService.type, recordActive: true })
          .sort({ position: 1 })
          .exec((err, tasks) => {
            if (err) {
              return res.status(500).json({
                success: false,
                message: "No se pueden consultar las tareas",
                errors: err,
                user: req.user
              });
            } else {
              tasks.forEach(task => {
                let commonTask = new CommonServiceTask({
                  commonService: commonService._id,
                  task: task._id,
                  type: commonService.type,
                  project: commonService.project,
                  status: 0
                });
                commonTask.save((err, commonTask) => {
                  if (err) {
                    return res.status(400).json({
                      success: false,
                      message: "No se puede guardar el registro",
                      errors: err,
                      user: req.user
                    });
                  } else {
                    SubTask.find({ task: task._id, recordActive: true })
                      .populate("task")
                      .exec((err, subTasks) => {
                        if (err) {
                          return res.status(500).json({
                            success: false,
                            message: "No se pueden consultar las tareas",
                            errors: err,
                            user: req.user
                          });
                        } else {
                          subTasks.forEach(subTaskElement => {
                            let commonServiceSubTask = new CommonServiceSubTask(
                              {
                                commonService: commonService._id,
                                subTask: subTaskElement._id,
                                task: task._id,
                                type: commonService.type,
                                project: commonService.project,
                                status: 0
                              }
                            );
                            commonServiceSubTask.save(
                              (err, commonServiceSubTask) => {
                                if (err) {
                                  return res.status(400).json({
                                    success: false,
                                    message: "No se puede guardar el registro",
                                    errors: err,
                                    user: req.user
                                  });
                                } else {
                                }
                              }
                            );
                          });
                        }
                      });
                  }
                });
              });
            }
          });
      }
    });
  }

  res.status(200).json({
    success: true,
    message: "Operación realizada de forma exitosa.",
    user: req.user
  });
};

module.exports = {
  saveFloors,
  saveCommonService
};
