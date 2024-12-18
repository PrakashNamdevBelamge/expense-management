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
    email: {
        email: "", rule: [
            value => {
                if (value) return true
                return 'Email is required.'
            },
            value => {
                if (value.match('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')) return true;
                return "Please enter valid email"
            }
        ]
    },
    password: {
        password: "", valid: true, rule: [
            value => {
                if (value) return true
                return 'Password is required.'
            },
            value => {
                if (value.length >= 6) return true
                return 'Minimum length is 6.'
            }
        ]
    }
})

const createUser = () => {
    const encodedPassword = btoa(formBuild.value.password.password);

    const data = {
        userName: formBuild.value.name.name,
        email: formBuild.value.email.email,
        password: encodedPassword
    }
    useUserStore.addUser(data).then(res => {
        if (res)
            router.push({ path: '/login' })
    })
}

const cancel = () => {
    router.push({ path: '/login' })
}
</script>
<template>

    <div class="container">
        <v-card class="card-width">
            <v-card-title class="card-title dark-blue"><span> Create New User</span></v-card-title>
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
                            <label> Email</label>
                            <v-text-field type="email" variant="outlined" name="email" v-model="formBuild.email.email"
                                placeholder="Please enter email" :rules="formBuild.email.rule" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <label> Password</label>
                            <v-text-field type="password" variant="outlined" name="password"
                                v-model="formBuild.password.password" placeholder="Please enter password"
                                :rules="formBuild.password.rule" />
                        </v-col>
                    </v-row>

                    <div class="btn">
                        <v-btn variant="outlined" class="success-btn" @click="createUser"
                            style="padding: 5px 30px;">Save</v-btn>
                        <v-btn variant="outlined" class="cancel-btn" @click="cancel">Cancel</v-btn>
                    </div>


                </v-form>
            </v-card-text>
        </v-card>
    </div>

</template>
<style scoped>
.container {
    padding-top: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
}


.card-title {
    font-weight: bold;
    padding-left: 25px;
}

.card-width {
    display: block;
    width: 40%;
    height: 90vh;
    border-radius: 20px;
}

.login-btn {
    width: 350px;
    background-color: blue;
    color: white;
}

.footer {
    display: flex;
    justify-content: space-around;
}

.btn {
    padding-top: 25px;
    display: flex;
    justify-content: end;

}
</style>
