module.exports = function(sequelize, Datatypes) {
    var Appointment = sequelize.define('Appointment', {
        apiAppointmentToken: {
            type: Datatypes.STRING,
            primaryKey: true
        },
        clientId: {
            type: Datatypes.STRING
        }
    }, {
        freezeTableName: true,
    });

    return Appointment;
};
