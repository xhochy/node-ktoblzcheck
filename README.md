ktoblzcheck-node
================

Node.JS binding for ktoblzcheck

Usage
=====

Get the location of a bank:

```javascript
ktoblzcheck.getLocationForBLZ(37010050)
```

Get the name of a bank:

```javascript
ktoblzcheck.getNameForBLZ(37010050)
```

Check a combination of BLZ and account number:

```javascript
ktoblzcheck.checkBLZAccount(50010517, 0648489890)
```
