import type {FormRules} from "element-plus";

export const rules: FormRules = {
    username: [
        {required: true, message: 'Please enter username', trigger: 'blur'},
        {min: 3, max: 20, message: 'Length should be 3 to 20', trigger: 'blur'},
    ],
    password: [
        {required: true, message: 'Please enter password', trigger: 'blur'}
    ],
    phoneNumber: [
        {required: true, pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, message: 'Invalid phone number', trigger: 'blur'},
    ],
    nickName: [
        {required: true, message: 'Please enter nick name', trigger: 'blur'}
    ]
}
