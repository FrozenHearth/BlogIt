<template>
  <v-alert
    v-if="hideAlert === false"
    :type="type"
    class="alert-banner-add-blog"
    width="300"
  >
    {{ alertMsg }}
  </v-alert>
</template>

<script>
export default {
  name: 'Alert',
  props: [
    'blogPublished',
    'blogUpdated',
    'blogDeleted',
    'draftCreated',
    'draftUpdated',
    'draftDeleted'
  ],
  data: () => ({
    alertMsg: '',
    type: undefined,
    hideAlert: null
  }),
  methods: {
    alertConfig(alertMsg, type, hideAlert) {
      this.alertMsg = alertMsg;
      this.type = type;
      this.hideAlert = hideAlert;
    }
  },
  watch: {
    blogPublished() {
      if (this.blogPublished === true) {
        this.alertConfig('Blog successfully published!', 'success', false);
      } else if (this.blogPublished === false) {
        this.alertConfig(
          'Failed to publish blog! Please check the entered details.',
          'error',
          false
        );
      }
    },
    blogUpdated() {
      if (this.blogUpdated === true) {
        this.alertConfig('Blog successfully updated!', 'success', false);
      } else if (this.blogUpdated === false) {
        this.alertConfig(
          'Failed to update blog! Please check the entered details',
          'error',
          false
        );
      }
    },
    blogDeleted() {
      if (this.blogDeleted === true) {
        this.alertConfig('Blog deleted successfully!', 'success', false);
      } else if (this.blogDeleted === false) {
        this.alertConfig('Failed to delete blog!', 'error', false);
      }
    },
    draftCreated() {
      if (this.draftCreated === true) {
        this.alertConfig('Draft created successfully!', 'success', false);
      } else if (this.draftCreated === false) {
        this.alertConfig(
          'Failed to create draft. Please check the entered details',
          'error',
          false
        );
      }
    },
    draftUpdated() {
      if (this.draftUpdated === true) {
        this.alertConfig('Draft updated successfully!', 'success', false);
      } else if (this.draftUpdated === false) {
        this.alertConfig(
          'Failed to update draft. Please check the entered details',
          'error',
          false
        );
      }
    },
    draftDeleted() {
      if (this.draftDeleted === true) {
        this.alertConfig('Deleted draft successfully!', 'success', false);
      } else if (this.draftDeleted === false) {
        this.alertConfig('Failed to delete draft', 'error', false);
      }
    }
  }
};
</script>

<style lang="scss">
.alert-banner-add-blog {
  position: absolute;
  right: 2em;
  top: 2em;
}
</style>
