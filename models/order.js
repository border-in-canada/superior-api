const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    debtorDetails: {
        debtorName: {
            type: String,
            required: true
        },
        debtorEmail: {
            type: String,
            required: false
        },
        debtorPhone: {
            type: String,
            required: false
        },
        debtorAddress: {
            type: String,
            required: false
        },
        debtorCity: {
            type: String,
            required: false
        },
        debtorStateProvince: {
            type: String,
            required: false
        },
        debtorPostalCode: {
            type: String,
            required: false
        },
        debtorSSN: {
            type: String,
            required: false
        },
        debtorDOB: {
            type: String,
            required: false
        },
        employer: {
            type: String,
            required: false
        },
        employerAddress: {
            type: String,
            required: false
        },
        employerCity: {
            type: String,
            required: false
        },
        employerStateProvince: {
            type: String,
            required: false
        },
        employerPostalCode: {
            type: String,
            required: false
        }
    },
    vehicleDetails: {
        make: {
            type: String,
            required: false
        },
        model: {
            type: String,
            required: false
        },
        year: {
            type: String,
            required: false
        },
        color: {
            type: String,
            required: false
        },
        vin: {
            type: String,
            required: false
        },
        license: {
            type: String,
            required: false
        },
        keyCodes: {
            type: String,
            required: false
        },
        accountNumber: {
            type: String,
            required: false
        },
        loanBalance: {
            type: String,
            required: false
        },
        monthlyPayment: {
            type: String,
            required: false
        },
        datesDelinquent: {
            type: String,
            required: false
        },
        remarks: {
            type: String,
            required: false
        }
    },
    orderDetails: {
        agency: {
            type: String,
            required: false
        },
        officer: {
            type: String,
            required: false
        },
        agencyPhone: {
            type: String,
            required: false
        },
        transportAddress: {
            type: String,
            required: false
        },
        transportCity: {
            type: String,
            required: false
        },
        transportStateProvince: {
            type: String,
            required: false
        },
        transportPostalCode: {
            type: String,
            required: false
        }
    },
    orderActive: {
        type: Boolean,
        default: true,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Order', orderSchema);