<template>
  <div id="users">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>User Manage</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="header">
        <el-input
            v-model="keyword"
            placeholder="Please input"
            class="input"
            clearable
        >
          <template #append>
            <el-button :icon="Search" @click="handleSearch"/>
          </template>
        </el-input>
        <el-popconfirm
            width="220"
            confirm-button-text="OK"
            cancel-button-text="No, Thanks"
            :icon="InfoFilled"
            icon-color="#626AEF"
            title="Are you sure to disable these users?"
            @confirm="disableUsers"
        >
          <template #reference>
            <el-button type="danger" size="default">Batch Disable</el-button>
          </template>
        </el-popconfirm>
        <el-popconfirm
            width="220"
            confirm-button-text="OK"
            cancel-button-text="No, Thanks"
            :icon="InfoFilled"
            icon-color="#626AEF"
            title="Are you sure to enable these users?"
            @confirm="enableUsers"
        >
          <template #reference>
            <el-button type="primary" size="default">Batch Enable</el-button>
          </template>
        </el-popconfirm>
      </div>
      <el-table :data="searchRes.length? searchRes : tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="id" width="55px"></el-table-column>
        <el-table-column prop="username" label="Username"></el-table-column>
        <el-table-column prop="nickname" label="Nickname"></el-table-column>
        <el-table-column prop="gender" label="Gender">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span>{{ scope.row.gender === 0 ? 'Female' : 'Male' }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Avatar">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-avatar :src="scope.row.avater"></el-avatar>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="Email"></el-table-column>
        <el-table-column prop="phoneNumber" label="Phone"></el-table-column>
        <el-table-column label="Status">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-switch v-model="scope.row.status" @change="toggleUserStatus([scope.row.id])" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Operations">
          <template #default="scope">
            <el-button size="small" @click="openEditFormDialog(scope.row)">Edit</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          v-model:current-page="query.requestPage"
          v-model:page-size="query.pageSize"
          :page-sizes="[5, 10, 20]"
          layout="sizes, prev, pager, next"
          :total="total"
          @size-change="getUserList"
          @current-change="getUserList"
      />
    </el-card>

    <el-dialog v-model="dialogFormVisible" title="Edit USer Info" width="400px">
      <el-form ref="editFormRef" :model="editForm" :rules="rules">
        <el-form-item label="Nick Name" prop="nickName">
          <el-input v-model="editForm.nickName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Phone Number" prop="phoneNumber">
          <el-input v-model="editForm.phoneNumber" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleEdit">
          Confirm
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {ArrowRight, InfoFilled, Search} from '@element-plus/icons-vue'
import {ref} from "vue";
import {disableOrEnableUserApi, getUserListApi, updateUserApi} from "@/apis/users";
import {ElMessage, FormInstance} from "element-plus";
import {rules} from "@/rules/userinfo";

const keyword = ref<string>();
const query = ref({
  pageSize: 5,
  requestPage: 1
})
let total = ref<number>(0);

interface User {
  "avater": string,
  "createTime": Date,
  "email": string,
  "gender": number,
  "id": number,
  "integration": number,
  "isDeleted": 0 | 1,
  "nickname": string,
  "password": string,
  "phoneNumber": string,
  "status": boolean,
  "updateTime": Date,
  "username": string
}

const tableData = ref<User[]>([]);
const getUserList = async () => {
  const res = await getUserListApi(query.value);
  if (res && res.code == 200) {
    res.data.records.map((item: any) => {
      item.status = Boolean(item.status)
    })
    tableData.value = res.data.records;
    total = res.data.totalElements;
  }
}

const selectedUsers = ref<User[]>([]);
const handleSelectionChange = (val: User[]) => {
  selectedUsers.value = val;
}
const disableUsers = async () => {
  selectedUsers.value = selectedUsers.value.filter((user) => !user.status);
  await toggleUserStatus();
}
const enableUsers = async () => {
  selectedUsers.value = selectedUsers.value.filter((user) => user.status);
  await toggleUserStatus();
}
const getUserId = (user: User[]) => {
  return user.map((user) => user.id);
}
const toggleUserStatus = async (ids?: number[]) => {
  const targetIds = ids ? ids : getUserId(selectedUsers.value);
  if (!targetIds.length) {
    ElMessage.error("No user selected");
    return;
  }
  const res = await disableOrEnableUserApi(targetIds);
  if (res && res.code === 200) {
    ElMessage.success(res.message);
  }
}

const searchRes = ref<User[]>([]);
const handleSearch = () => {
  searchRes.value = tableData.value.filter((user) =>
    user.username
        .toLocaleLowerCase()
        .indexOf(keyword.value?.toLocaleLowerCase()) != -1
  )
}

interface EditForm {
  phoneNumber: string,
  nickName: string
}
const editUserId = ref(-1)
let dialogFormVisible = ref<boolean>(false);
const editForm = ref<EditForm>({
  nickName: '',
  phoneNumber: ''
})

const openEditFormDialog = (row: User) => {
  dialogFormVisible.value = true;
  editForm.value.nickName = row.nickname;
  editForm.value.phoneNumber = row.phoneNumber;
  editUserId.value = row.id;
}
const handleEdit = async () => {
  await editFormRef.value?.validate();
  await updateUserApi(editUserId.value, editForm.value);
  ElMessage.success("Edit Success");
  dialogFormVisible.value = false;
  getUserList().then(() => {});
}
const editFormRef = ref<FormInstance>()

getUserList();
</script>

<style scoped lang="scss">
#users {
  .el-breadcrumb {
    margin-bottom: 20px;
  }

  .header {
    .input {
      width: 30%;
      margin-right: 10px;
    }
  }

  .el-pagination {
    margin-top: 20px;
  }
}
</style>
