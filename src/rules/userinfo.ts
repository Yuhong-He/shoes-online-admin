import type {FormRules} from "element-plus";

export const rules: FormRules = {
    username: [
        {required: true, message: 'Please enter username', trigger: 'blur'},
        {min: 3, max: 20, message: 'Length should be 3 to 20', trigger: 'blur'},
    ],
    password: [
        {required: true, message: 'Please enter password', trigger: 'blur'}
    ]
}
