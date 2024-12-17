<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { userStore } from '../stores/UserStore'

const useUserStore = userStore();
const router = useRouter();

const formBuild = ref({
    name: {
        name: "", rule: [
            value => {
                if (value) return true
                return 'UserName is required.'
            }
        ]
    },
    password: {
        password: "", valid: true, rule: [
            value => {
                if (value) return true
                return 'Password is required.'
            }
        ]
    }
})
const login = () =>{
    const encodedPassword = btoa(formBuild.value.password.password); 
console.log(encodedPassword);
    const data = {
        userName:formBuild.value.name.name,
        password:encodedPassword
    }
    useUserStore.validateUser(data).then(res=>{
        console.log('----------------',res);
    if(res){
        localStorage.setItem('userData',JSON.stringify(res));
    router.push({path:'/expenses'});
    }
    })

}
</script>
<template>

    <div class="container">
        <v-card class="card-width">
            <v-card-title class="card-title dark-blue"><span> Employee Login</span></v-card-title>
            <v-card-text style="padding: 25px;">
                <v-form>
                    <v-row>
                        <v-col>
                            <label> User Name</label>
                            <v-text-field variant="outlined" name="name" v-model="formBuild.name.name"
                                placeholder="Please enter user name" :rules="formBuild.name.rule" />
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <label> Password</label>
                            <v-text-field type="password" variant="outlined" name="password" v-model="formBuild.password.password"
                                placeholder="Please enter password" :rules="formBuild.password.rule" />
                        </v-col>
                    </v-row>

                    <div style="padding-top: 10px;">
                        <v-btn variant="outlined" class="login-btn" @click="login">Login</v-btn>
                    </div>


                </v-form>
            </v-card-text>
            <div class="footer">
    <RouterLink to="/newuser">
        Register new user?
    </RouterLink>
    <RouterLink to="/forgotpassword">
        Forgot password?
    </RouterLink>
</div>
        </v-card>
    </div>

</template>
<style scoped>

.container{
    padding-top: 4%;
    width: 100%;
    display: flex;
    justify-content: center;
}


.card-title{
    font-weight: bold;
   padding-left: 25px;
}

.card-width{
   display: block;
    width: 30%;
    height: 80vh;
    max-height: 90vh;
    border-radius: 20px;
}
.login-btn{
    width: 350px;
    background-color: blue;
    color: white;
}
.footer{
    display: flex;
    justify-content: space-around;
}
</style> 

