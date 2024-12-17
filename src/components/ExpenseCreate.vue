<script setup>
import { defineEmits, ref, watch, computed } from 'vue';
import { useToast } from 'vue-toastification';
import ConfirmDialog from './ConfirmDialog.vue';
import { useRouter } from 'vue-router';
import { useExpenseStore } from '../stores/ExpenseStore'
import { VDateInput } from 'vuetify/labs/VDateInput'
import { userStore } from '../stores/UserStore'

const useUserStore = userStore();
const expenseStore = useExpenseStore();
const router = useRouter();
const id = ref('')
const emit = defineEmits(['response', 'save'])
const editEmployeeProps = defineProps(['editData']);
const today = computed(() => new Date().toISOString().split('T')[0])
const toast = useToast()
const categories = ref(['FOOD', 'TRANSPORT','UTILITIES', 'ENTERTAIMENT','MISCELLANEOUS']);
const enableSave = ref(true)
const onConfirm = ref(false);
const titleMessage = ref('Are you sure you want to discard changes?')
const buttonName = ref('Save');
const formDirty = ref(false);
const backToList = (response) => {
    if (response == 'Yes') {
        router.push({ path: '/expenses' })
    }
    onConfirm.value = false;
}
const save = () => {
    const savedata = {
        title: formBuilder.value.title.title,
        amount: formBuilder.value.amount.amount,
        id: formBuilder.value.id,
        category: formBuilder.value.category.category,
        date: formBuilder.value.date.date,
        userId: useUserStore.user[0].id
    }
    saveRecord(savedata);
}

const saveRecord = (data) => {
    
    if (data.id) {
        const response = expenseStore.updateExpense(data);
        response.then(res => {
            if (res) {
                toast.success("User expense  updated successfully")
                router.push({ path: '/expenses' });


            }
        })
    } else {
        const response = expenseStore.addExpense(data);
        response.then(res => {
            
            if (res) {
                toast.success("User expense created successfully")
                router.push({ path: '/expenses' });
            }
        })
    }
}

console.log(useUserStore.user[0]);
const formBuilder = ref({
    title: {
        title: "", rule: [
            value => {
                if (value) return true
                return 'Title is required.'
            }
        ]
    },
    amount: {
        amount: "", rule: [
            value => {
                if (value) return true
                return 'Amount is required.'
            }
        ]
    },
    id: null,
    category: {
        category: "", rule: [
            value => {
                if (value) return true
                return 'Category is required.'
            }
        ]
    },
    date: {
        date: null,  rule: [
            value => {
                if (value) return true
                return 'Expense date is required.'
            }
        ]
    },
})

if (router.currentRoute.value.params?.id) {
    id.value = router.currentRoute.value.params.id;
    buttonName.value = 'Update';
    const employees = ref(expenseStore.employees);
    const index = employees.value.findIndex(emp => emp.id == id.value);
    const data = ref(employees.value[index]);
    formBuilder.value.title = { title: data.value.title }
    formBuilder.value.id = id
    formBuilder.value.amount = { amount: data.value.amount }
    formBuilder.value.category = { category: data.value.category }
    formBuilder.value.date = { date: data.value.date }
}

watch(formBuilder.value, (data) => {
    const count = ref(0);
    formDirty.value = true;
    if (formBuilder.value.title.title.trim() == "") {
        count.value++;
    }

    if (formBuilder.value.amount.amount == "") {
        count.value++;
    }

    if (formBuilder.value.category.category == '') {
        count.value++;
    }
    if (formBuilder.value.date.date == "") {
        count.value++;
    }

    if (count.value > 0) {
        enableSave.value = true;
    } else {
        enableSave.value = false;
    }
})

const openDialog = () => {
    if (formDirty.value) {
        onConfirm.value = true;
    } else {
        onConfirm.value = false;
        router.push({ path: '/expenses' });

    }
}

</script>
<template>
    <div style="padding: 60px 10px 10px 10px;">
    <h4 @click="openDialog" class="dark-blue">  <- back to list  </h4>
   
</div>

    <v-card>
        <v-card-title class="card-title dark-blue">Create User Expense</v-card-title>
        <v-card-text class="card-text">
            <v-form @submit.prevent="save">
                <v-row>
                    <v-col cols="4">
                        <label class="required">Title</label>
                        <v-text-field variant="outlined" name="title" v-model="formBuilder.title.title"
                            placeholder="Please enter expense title" :rules="formBuilder.title.rule" />

                    </v-col>
                    <v-col cols="4">
                        <label>Amount</label>
                        <v-text-field variant="outlined" type="number" name="amount" v-model="formBuilder.amount.amount"
                            :rules="formBuilder.amount.rule" placeholder="Please enter expense amount" />
                    </v-col>

                    <v-col cols="4">
                        <label>Category</label>
                        <v-select variant="outlined" name="category" v-model="formBuilder.category.category"
                            :rules="formBuilder.category.rule" :items="categories" />
                    </v-col>
                    <v-col cols="4">
                        <label>Expense Date</label>
                        <v-date-input variant="outlined" name="date" :max="today"
                            :rules="formBuilder.date.rule" v-model="formBuilder.date.date"
                            prepend-icon="" append-inner-icon="$calendar" />
                    </v-col>
                </v-row>

                <div class="btn-container">
                    <v-btn type="submit" class="success-btn " style="margin-right: 10px;padding: 10px 30px"
                        :disabled="enableSave">{{ buttonName }}</v-btn>
                    <v-btn variant="outlined" type="button" class="cancel-btn" @click="openDialog">Cancel</v-btn>

                </div>
            </v-form>
        </v-card-text>
    </v-card>
    <v-card>

    </v-card>

    <ConfirmDialog v-if="onConfirm" @confirm="backToList" :title="titleMessage" :openBox="onConfirm" />
</template>
<style scoped>
.form-container {
    display: flex;
    justify-content: center;
}

.button-width {
    padding: 10px 40px;
}

.form-border {
    width: 40%;
    padding: 30px;
    border: 3px solid black;
    background-color: aliceblue;
    border-radius: 40px;
}

.header {
    color: coral;
    display: flex;
    justify-content: center;
}

.btn-container {
    display: flex;
    justify-content: end;
}

.card-title {
    font-weight: bold !important;
    padding-bottom: 10px;
    border-bottom: 1px solid black;
}

.card-text {
    padding-top: 50px !important;
}
</style>