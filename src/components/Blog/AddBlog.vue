<template>
  <v-content>
    <div class="add-blog-container">
      <v-form ref="form">
        <v-col :style="{ margin: '1em auto 0 auto' }" cols="12" sm="6" md="4">
          <v-text-field
            minlength="10"
            maxlength="150"
            solo
            type="text"
            label="Add Blog Title"
          ></v-text-field>
        </v-col>
        <v-col :style="{ margin: '0 auto' }" cols="12" sm="6" md="4">
          <v-textarea
            minlength="50"
            solo
            type="text"
            label="Blog Description"
          ></v-textarea>

          <v-file-input label="Upload an image" solo> </v-file-input>
          <div class="uploaded-image-container">
            <img
              class="uploaded-image"
              src="https://images.unsplash.com/photo-1586420262747-f545aa1f9aa0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=652&q=80"
              alt=""
            />
          </div>
          <v-text-field
            v-on:keyup.enter="submit"
            label="Add Tag Name and hit Enter"
            solo
          >
          </v-text-field>
          <div class="entered-tags-list">
            <v-chip v-for="(tag, index) in tags" :key="index" class="ma-2">
              {{ tag }}
            </v-chip>
          </div>
        </v-col>
        <v-btn class="publish-btn" color="primary">
          Publish
        </v-btn>
        <v-btn color="success">
          Save as Draft
        </v-btn>
      </v-form>
    </div>
  </v-content>
</template>

<script>
export default {
  name: 'AddBlog',
  data: () => ({
    tags: [],
    tagname: ''
  }),
  methods: {
    submit({ target }) {
      this.tagname = target.value;
      this.tags.push(this.tagname);
      target.value = '';
    }
  }
};
</script>

<style lang="scss" scoped>
.add-blog-container {
  position: relative;
  top: 10em;
  margin-bottom: 5em;
}
.entered-tags-list {
  display: flex;
}
.publish-btn {
  margin-right: 1em;
}
.v-input__icon {
  display: none;
}
.uploaded-image-container {
  width: inherit;
  height: 50em;
  margin-bottom: 4em;
}
.uploaded-image {
  width: 100%;
  height: 100%;
  border-radius: 3px;
  object-fit: cover;
}
.banner {
  width: 50em;
  height: 30em;
}
.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.publish-btn {
  margin-left: -13em;
}
</style>
