<script>
// import { ipcMain } from 'electron';

export default {
    methods: {
        quit() {
            // ipcMain.invoke('app-q')
            window.electronAPI.quit();
        }
    }
}
</script>

<template>
    <header>

        <!-- 
        <div class="windowcontrol">
            <div class="float-right">
                <button type="button" @click="quit">X</button>
                    <button type="button" @click="quit">X</button> --
            </div>
        </div>-->
        <ul class="nav justify-content-end">
            <li class="nav-item">
                <RouterLink class="nav-link" to="/">Connection</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink class="nav-link" to="/lights">Lights</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink class="nav-link" to="/midi">MIDI</RouterLink>
            </li>
        </ul>
    </header>
</template>

<style>
header {    
    /* position: absolute; */
    width: 100%;
}

.windowcontrol {
    top: 0px;
    width: 100%;
    height: 25px;
    background-color: grey;
}

.float-right {
    float: right;
    height: max-content;
}

.float-right>* {
    height: 25px;
    margin-left: 5px;
    padding: 0px 10px;
}

.float-right button {
    /* margin: 0px; */
    /* padding: 0px; */
    border: 0px;
}
</style>