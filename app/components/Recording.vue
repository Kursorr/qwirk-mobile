<template>
  <ActivityIndicator :busy="insideActivityIndicator"/>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
    ...mapGetters({
        insideActivityIndicator: 'activityIndicator/insideActivityIndicator'
      })
    },
    watch: {
      insideActivityIndicator: function(val) {
        if (!val) this.$modal.close()
      }
    }
  }
</script>
