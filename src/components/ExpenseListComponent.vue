<script setup>
import { ref, computed, watch } from 'vue';
import { useToast } from 'vue-toastification';
import { debounce } from 'lodash'
import { useExpenseStore } from '../stores/ExpenseStore'
import ConfirmDialog from './ConfirmDialog.vue';
import { useRouter } from 'vue-router';
import { userStore } from '../stores/UserStore'
import { VDateInput } from 'vuetify/labs/VDateInput'

const useUserStore = userStore();
const router = useRouter();
const pageNumber = ref(0);
const toast = useToast()
const isDisableList = ref(false)
const editData = ref({});
const searchParam = ref('');
const fromDate = ref(null);
const toDate = ref(null);
const isDisabled = ref(true);
const expensesStore = useExpenseStore();
const onDeleteConfirm = ref(false);
const deleteElement = ref('');
const titleMessage = ref('Are you sure you want to delete expense?')
const today = computed(() => new Date().toISOString().split('T')[0])

const getExpenses = async () => {
    await expensesStore.getAllExpenses(pageNumber.value, useUserStore.user[0].id);
}

getExpenses();

const editExpense = (record) => {
    router.push({ path: `/expenses/edit/${record.id}` })
}

const deleteExpense = (response) => {
    if (response == 'Yes') {
        expensesStore.deleteExpense(deleteElement.value.id);
        deleteElement.value = '';
        toast.success('Employee deleted successfully');
    }
    onDeleteConfirm.value = false;
}

const deleteDialog = (record) => {
    deleteElement.value = record;
    onDeleteConfirm.value = true;
}

const searchEmployee = debounce(function () {
    if (searchParam.value != "") {
        const query = `?userId=${useUserStore.user[0].id}&searchValue=${searchParam.value}`
        expensesStore.searchExpenses(query);
    } else {
        getExpenses()
    }
}, 1000)

const onPageChange = (data)=>{
    pageNumber.value = data-1;
    getExpenses();
}
const categories = ['Keyword','DateRange']
const categoryValue = ref('Keyword');

const onDate1Selected = (newDate) =>{
    isDisabled.value = false;
    if(toDate.value != null){
if(fromDate.value > toDate.value){
    toast.warning('From date should be less than toDate')
} else {
    const query = `?userId=${useUserStore.user[0].id}&fromDate=${new Date(fromDate.value).toISOString().split('T')[0]}&toDate=${new Date(toDate.value).toISOString().split('T')[0]}`
    expensesStore.searchExpenses(query);
}
    }
}
const onDate2Selected = (newDate) =>{
    if(fromDate.value > toDate.value){
    toast.warning('From date should be less than toDate')
}  else {
    const query = `?userId=${useUserStore.user[0].id}&fromDate=${new Date(fromDate.value).toISOString().split('T')[0]}&toDate=${new Date(toDate.value).toISOString().split('T')[0]}`
    expensesStore.searchExpenses(query);
}
}

const clearFilter = () =>{
    getExpenses();
}

</script>

<template>



    <div v-if="!isDisableList">
        <div class="create-btn-container">
            <RouterLink to="/expenses/create">
                <v-btn class="success-btn" style="padding: 10px 10px;margin-right: 20px;">
                    Create Expense
                </v-btn>
            </RouterLink>
        </div>
        <v-card style="padding: 10px 5px;">
          <div style="display: flex; justify-content: flex-start;">
           
                <div style="width: 20%;padding-right: 5px;">
            <v-select variant="outlined" style="width: 100%;" name="categoryValue" v-model="categoryValue"
            :items="categories" />
                </div>
            <div v-if="categoryValue == 'Keyword'" style="width: 20%;">
                

                <v-text-field  variant="outlined" prepend-inner-icon="mdi-magnify" type="search" name="search"
                    placeholder="Search expenses" style="width: 100%;" aria-label="Search" v-model="searchParam"
                    @input="searchEmployee" />

            </div>
            <div v-if="categoryValue == 'DateRange'" style="width: 20%;">
                

                <v-date-input  variant="outlined"   name="fromDate" :max="today"
                    placeholder="enter from date yyyy-MM-dd" style="width: 100%;"  v-model="fromDate" @update:model-value="onDate1Selected"
                     prepend-icon="" append-inner-icon="$calendar"/>
                </div>
                <div v-if="categoryValue == 'DateRange'" style="width: 20%;margin-left: 5px;">

                    <v-date-input  variant="outlined" :disabled="isDisabled"  name="toDate" :max="today"
                    placeholder="enter to date yyyy-MM-dd" style="width: 100%;" v-model="toDate"  @update:model-value="onDate2Selected"
                    prepend-icon="" append-inner-icon="$calendar"/>
</div>
<div>
    <v-btn variant="outlined" class="clear-btn" @click="clearFilter" style="padding: 10px 10px;margin-right: 20px;">
                    Clear Filter
                </v-btn>
</div>
                
            </div>

            <v-table height="300px" fixed-header>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Date</th>
                        
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody v-if="expensesStore.expenses && expensesStore.expenses.length > 0">
                    <tr v-for="expense in expensesStore.expenses" :key="expense.id">
                        <td>{{ expense.title }}</td>
                        <td>{{ expense.category }}</td>
                        <td>{{ expense.amount }}</td>
                        <td>{{ expense.date }} </td>
                        <td>
                            <span>
                                <v-btn @click="editExpense(expense)" class="icon" variant="text">
                                    <font-awesome-icon icon="pen-to-square" />
                                </v-btn>
                            </span>
                            <span>
                                <v-btn variant="text" @click="deleteDialog(expense)" class="icon">
                                    <font-awesome-icon icon="trash" />
                                </v-btn> </span>
                        </td>
                    </tr>
                </tbody>
            </v-table>
            <div class="text-center">
                <v-pagination style="justify-content: end;" :length="expensesStore.pages" rounded="circle" @update:modelValue="onPageChange"></v-pagination>
            </div>
        </v-card>
    </div>

    <ConfirmDialog v-if="onDeleteConfirm" @confirm="deleteExpense" :title="titleMessage" :openBox="onDeleteConfirm" />
</template>
<style scoped>
.create-btn-container {
    justify-content: end;
    display: flex;
    padding: 65px 1px 15px 1px !important;

    button {
        background-color: blue;
        color: white;
    }
}

.edit {
    padding: 5px 17px;
    color: white;
    background-color: green;
}

.delete {
    padding: 5px;
    color: white;
    background-color: red;
}

th {
    font-size: 14px;
    border-width: 1px !important;
}

td {
    font-size: 16px;
    padding: 2px 20px;
    font-weight: 600;
}
.clear-btn{
    height: 55px;
    background-color: aliceblue;
    margin-left: 5px;
}
</style>