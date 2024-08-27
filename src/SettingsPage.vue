<script setup>
import { ref, watch, onMounted } from 'vue'

// Variabile pentru setări
const selectedColor = ref('#000000')
const selectedFont = ref('Arial')
const selectedFontSize = ref('16px')

// Salvează valorile în localStorage când se modifică
watch([selectedColor, selectedFont, selectedFontSize], ([newColor, newFont, newFontSize]) => {
    localStorage.setItem('textColor', newColor)
    localStorage.setItem('textFont', newFont)
    localStorage.setItem('textSize', newFontSize)
})

// Citește valorile din localStorage când pagina este montată
onMounted(() => {
    selectedColor.value = localStorage.getItem('textColor') || '#000000'
    selectedFont.value = localStorage.getItem('textFont') || 'Arial'
    selectedFontSize.value = localStorage.getItem('textSize') || '16px'
})
</script>

<template>
    <div class="settings-page">
        <h1>Settings</h1>
        <button @click="$router.push('/')" class="home-button">
            Home Page
        </button>

        <!-- Controale pentru modificarea stilurilor -->
        <div class="settings-controls">
            <label for="color">Selecteaza Culoarea Textului:</label>
            <input type="color" id="color" v-model="selectedColor" />

            <label for="font">Selecteaza Fontul Textului:</label>
            <select id="font" v-model="selectedFont">
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
                <option value="Georgia">Georgia</option>
            </select>

            <label for="fontSize">Selecteaza Marimea Textului: (px)</label>
            <input type="number" id="fontSize" v-model="selectedFontSize" min="10" max="100" />
        </div>
    </div>
</template>
