var FFI = require('ffi'),
    ArrayType = require('ref-array'),
    Struct = require('ref-struct'),
    StrictType = require('ref-strict'),
    ref = require('ref');


var voidPtr = ref.refType(ref.types.void);
exports.CONSTANTS = {};
var AccountNumberCheck = exports.AccountNumberCheck = StrictType(voidPtr);
var AccountNumberCheck_Record = exports.AccountNumberCheck_Record = StrictType(voidPtr);

exports.ktoblzcheck = new FFI.Library('libktoblzcheck', {
    AccountNumberCheck_new: [AccountNumberCheck, []],
    AccountNumberCheck_new_file: [AccountNumberCheck, [ref.types.CString]],
    AccountNumberCheck_delete: [ref.types.void, [AccountNumberCheck]],
    AccountNumberCheck_check: [ref.types.int32, [AccountNumberCheck, ref.types.CString, ref.types.CString]],
    AccountNumberCheck_findBank: [AccountNumberCheck_Record, [AccountNumberCheck, ref.types.CString]],
    AccountNumberCheck_bankCount: [ref.types.uint32, [AccountNumberCheck]],
    AccountNumberCheck_createIndex: [ref.types.void, [AccountNumberCheck]],
    AccountNumberCheck_stringEncoding: [ref.types.CString, []],
    AccountNumberCheck_libraryVersion: [ref.types.CString, []],
    AccountNumberCheck_bankdata_dir: [ref.types.CString, []],
    AccountNumberCheck_Record_delete: [ref.types.void, [AccountNumberCheck_Record]],
    AccountNumberCheck_Record_copy: [AccountNumberCheck_Record, [AccountNumberCheck_Record]],
    AccountNumberCheck_Record_bankId: [ref.types.ulong, [AccountNumberCheck_Record]],
    AccountNumberCheck_Record_bankName: [ref.types.CString, [AccountNumberCheck_Record]],
    AccountNumberCheck_Record_location: [ref.types.CString, [AccountNumberCheck_Record]],
});

var checker = exports.ktoblzcheck.AccountNumberCheck_new();

exports.getLocationForBLZ = function(blz) {
    var record = exports.ktoblzcheck.AccountNumberCheck_findBank(checker, blz.toString());
    if (record.isNull()) {
        return null;
    }
    return exports.ktoblzcheck.AccountNumberCheck_Record_location(record);
}

exports.getNameForBLZ = function(blz) {
    var record = exports.ktoblzcheck.AccountNumberCheck_findBank(checker, blz.toString());
    if (record.isNull()) {
        return null;
    }
    return exports.ktoblzcheck.AccountNumberCheck_Record_bankName(record);
}

exports.checkBLZAccount = function(bank, account) {
    return exports.ktoblzcheck.AccountNumberCheck_check(checker, bank.toString(), account.toString());
}
