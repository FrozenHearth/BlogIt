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
            v-model="title"
          ></v-text-field>
        </v-col>
        <v-col :style="{ margin: '0 auto' }" cols="12" sm="6" md="4">
          <v-textarea
            minlength="50"
            solo
            type="text"
            label="Blog Description"
            v-model="details"
          ></v-textarea>

          <v-file-input
            @change="onImageUpload"
            v-model="file"
            clearable
            ref="myFile"
            accept="image/*"
            label="Upload an image"
            solo
            :loading="isLoading"
            counter
          >
          </v-file-input>
          <div
            v-if="imageUploaded"
            :style="{ backgroundImage: `url(${uploadedPic})` }"
            class="uploaded-image-container"
          ></div>
          <v-text-field
            v-on:keyup.enter="submit"
            label="Add Tag Name and hit Enter"
            solo
            min="1"
            max="15"
          >
          </v-text-field>
          <v-alert
            :style="{ width: '100%' }"
            v-if="tagExists === true"
            type="error"
          >
            Tag already exists! Please enter another tag name.
          </v-alert>
          <div class="entered-tags-list">
            <v-chip v-for="(tag, index) in tags" :key="index" class="ma-2">
              {{ tag }}
            </v-chip>
          </div>
        </v-col>
        <v-btn v-on:click="publishPost" class="publish-btn" color="primary">
          Publish
        </v-btn>
        <v-btn v-on:click="saveAsDraft" color="success">
          Save as Draft
        </v-btn>
      </v-form>
    </div>
  </v-content>
</template>

<script>
import axios from 'axios';
export default {
  name: 'AddBlog',
  data: () => ({
    file: null,
    title: '',
    details: '',
    pic: '',
    user: 0,
    tag: 0,
    tags: [],
    tagname: '',
    uploadedPic: '',
    imageUploaded: false,
    isLoading: false,
    tagExists: false
  }),
  methods: {
    onImageUpload() {
      this.isLoading = true;
      if (this.file) {
        const fd = new FormData();

        fd.append('pic', this.file, this.file.name);

        axios
          .post(`${axios.defaults.baseURL}/blogapp/picture`, fd)
          .then(res => {
            this.uploadedPic = res.data.pic;
            this.isLoading = false;
            this.imageUploaded = true;
          });
      } else {
        this.imageUploaded = false;
        this.isLoading = false;
      }
    },
    submit({ target }) {
      this.tag = target.value;
      if (this.tag !== '') {
        axios
          .post(`${axios.defaults.baseURL}/blogapp/tags`, {
            tag: this.tag
          })
          .then(res => {
            console.log(res.data);
            this.tag = res.data.id;
            this.tags.push(res.data.tag);
            target.value = '';
            this.tagExists = false;
          })
          .catch(err => {
            console.log(err);
            this.tagExists = true;
            target.value = '';
          });
        console.log(this.tags);
      }
    },
    publishPost() {
      // POST API Call to be added later here when backend is ready
      this.$router.push('/myPublished');
    },
    saveAsDraft() {
      // POST API Call to be added later here when backend is ready
      this.$router.push('/myDrafts');
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
  background-size: cover;
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
