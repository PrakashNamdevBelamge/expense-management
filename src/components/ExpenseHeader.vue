<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { userStore } from '../stores/UserStore'

const useUserStore = userStore();
const userName = ref(useUserStore.user[0].userName.slice(0,2))
const router = useRouter();
const logOut = () =>{
    router.push({path:'/login'})
}

const reports = () =>{
    router.push({path:'/expenses/reports'})
}
</script>





<template>
    <v-card class="mx-auto" style="z-index: 999;box-shadow: none;" max-width="448">
        <v-layout>
            <v-app-bar color="primary" density="compact">
               

                <v-app-bar-title>Expense Tracker Application</v-app-bar-title>
                <v-menu>
                                     <template v-slot:activator="{ props }">
                                        <v-btn @click="reports" class="report-btn" >
                    Expense Reports
                </v-btn>  
                        <span class="logo">{{ userName.toUpperCase() }}</span>
                        <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
                    </template>
                    <v-list>
                        <v-list-item @click="logOut">
                            <v-list-item-title>LogOut </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>


            </v-app-bar>


        </v-layout>
    </v-card>
</template>




<style scoped>
.logo {
    padding: 10px;
    border: 1px solid mintcream;
    border-radius: 25px;
}
.report-btn{
    background-color: green !important;
    padding: 10px 10px;
    margin-right: 20px;
}
</style>