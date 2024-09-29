<script>
export default{
    name: 'error',
}
</script>

<template>
    <div class='bg-yellow-700 flex items-start justify-center p-2 mt-4 text-white rounded'>
        <p class="break-all"><slot/></p>
        <i class="fa-solid fa-circle-exclamation text-xl ml-1"></i> 
    </div>
</template>