<template>
  <v-content>
    <div class="add-blog-container">
      <v-alert
        class="alert-banner"
        width="300"
        v-if="blogPublished === true"
        type="success"
      >
        Blog successfully published!
      </v-alert>
      <v-alert
        class="alert-banner"
        width="300"
        v-if="blogPublished === false"
        type="error"
      >
        Failed to publish blog! Please check the entered details.
      </v-alert>
      <v-alert
        class="alert-banner"
        width="300"
        v-if="blogDeleted === true"
        type="success"
      >
        Successfully Deleted Blog!
      </v-alert>
      <v-alert
        class="alert-banner"
        width="300"
        v-if="blogDeleted === false"
        type="error"
      >
        Failed to Delete Blog!
      </v-alert>
      <v-form ref="form">
        <v-col class="add-title-container" cols="12" sm="6" md="4">
          <v-text-field
            solo
            :rules="titleRules"
            type="text"
            label="Add Blog Title"
            v-model="title"
          ></v-text-field>
        </v-col>
        <v-col class="blog-description-container" cols="12" sm="6" md="4">
          <v-textarea
            minlength="50"
            solo
            :rules="descriptionRules"
            type="text"
            label="Blog Description"
            v-model="details"
          ></v-textarea>

          <v-file-input
            :rules="fileRules"
            @change="onImageUpload"
            v-model="file"
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
            :rules="tagNamesRules"
            v-on:keyup.enter="submitTags"
            label="Add Tag Name and hit Enter"
            solo
            min="1"
            max="15"
          >
          </v-text-field>
          <v-alert
            class="tag-alert-error"
            v-if="tagExists === true"
            type="error"
          >
            Tag already exists! Please enter another tag name.
          </v-alert>

          <div class="entered-tags-list">
            <v-chip
              close
              @click="removeTag(singleTag.id)"
              v-for="singleTag in tagNames"
              :key="singleTag.id"
              class="tag ma-2"
            >
              {{ singleTag.tag }}
            </v-chip>
          </div>
        </v-col>
        <div class="btn-container">
          <v-btn
            v-if="mode === 'create'"
            v-on:click="publishPost"
            class="publish-btn"
            color="primary"
          >
            Publish
          </v-btn>
          <v-btn
            v-if="mode === 'edit'"
            @click="onUpdateBlog"
            class="publish-btn"
            color="primary"
          >
            Update
          </v-btn>
          <v-btn
            @click="onDeleteBlog"
            v-if="mode === 'edit'"
            class="delete-btn"
            color="error"
          >
            Delete
          </v-btn>

          <v-btn
            v-on:click="saveAsDraft"
            class="save-as-draft-btn"
            color="success"
          >
            Save as Draft
          </v-btn>
        </div>
      </v-form>
    </div>
  </v-content>
</template>

<script>
import {
  imageUpload,
  addTags,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogDetails
} from '../../../apis/api';
export default {
  name: 'AddBlog',
  data: () => ({
    file: null,
    title: '',
    details: '',
    mode: 'create',
    pic: '',
    tag: 0,
    tagNames: [],
    user: null,
    tagIds: [],
    uploadedPic: '',
    blogPublished: null,
    blogDeleted: null,
    imageUploaded: false,
    imageUpdated: false,
    isLoading: false,
    tagExists: false,
    published: null,
    titleRules: [
      v => !!v || 'Title cannot be blank',
      v => /^[a-zA-Z ]/.test(v) || 'Title must be valid',
      v => (v && v.length > 10) || 'Title must be atleast 10 characters',
      v =>
        (v && v.length <= 150) || 'Title should not be more than 150 characters'
    ],
    descriptionRules: [
      v => !!v || 'Description cannot be blank',
      v => /^[a-zA-Z ]/.test(v) || 'Description must be valid',
      v => (v && v.length > 50) || 'Description must be atleast 50 characters'
    ],
    fileRules: [v => !!v || 'Please upload an image'],
    tagNamesRules: [
      v => !!v || 'Please enter atleast one tag',
      v => /^[a-zA-Z0-9 ]/.test(v) || 'Tag names must be valid'
    ]
  }),
  mounted() {
    if (this.$route.params.id) {
      this.mode = 'edit';
      const { id } = this.$route.params;
      getBlogDetails(id)
        .then(res => {
          const {
            title,
            details,
            picture_url,
            tag_details,
            user,
            pic
          } = res.data;
          this.title = title;
          this.details = details;
          this.uploadedPic = picture_url;
          this.tagNames = tag_details;
          this.imageUploaded = true;
          this.user = user;
          this.pic = pic;
        })
        .catch(err => console.log(err));
    } else {
      this.mode = 'create';
    }
  },
  methods: {
    onImageUpload() {
      this.isLoading = true;
      if (this.file) {
        const fd = new FormData();

        fd.append('pic', this.file, this.file.name);

        imageUpload(fd).then(res => {
          this.uploadedPic = res.data.pic;
          this.pic = res.data.id;
          this.isLoading = false;
          this.imageUploaded = true;
        });
      } else {
        this.imageUploaded = false;
        this.isLoading = false;
      }
    },
    submitTags({ target }) {
      this.tag = target.value;
      if (this.tag !== '') {
        const data = {
          tag: this.tag
        };
        addTags(data)
          .then(res => {
            this.tag = res.data.id;
            this.tagNames.push(res.data);
            this.tagIds.push(this.tag);
            target.value = '';
            this.tagExists = false;
          })
          .catch(() => {
            this.tagExists = true;
            target.value = '';
          });
      }
    },
    publishPost() {
      this.$refs.form.validate();
      if (
        this.title !== '' &&
        this.details !== '' &&
        this.pic !== '' &&
        this.tags !== ''
      ) {
        const tagIds = this.tagNames.map(el => el.id);
        this.published = true;
        const data = {
          title: this.title,
          details: this.details,
          pic: this.pic,
          tags: tagIds,
          published: this.published
        };
        createBlog(data)
          .then(() => {
            this.blogPublished = true;
            setTimeout(() => {
              window.scrollTo(0, 0);
              this.$router.push('/myPublished');
            }, 1000);
          })
          .catch(err => {
            console.log(err);
            this.blogPublished = false;
          });
      }
    },
    saveAsDraft() {
      this.$router.push('/myDrafts');
    },
    removeTag(id) {
      this.tagNames = this.tagNames.filter(el => el.id !== id);
    },
    onUpdateBlog() {
      const { id } = this.$route.params;
      this.$refs.form.validate();
      const tagIds = JSON.parse(JSON.stringify(this.tagNames.map(el => el.id)));
      const data = {
        title: this.title,
        details: this.details,
        pic: this.pic,
        tags: tagIds,
        user: this.user
      };
      updateBlog(id, data)
        .then(() => {
          this.blogPublished = true;
          window.scrollTo(0, 0);
          setTimeout(() => {
            this.$router.push(`/myPublished/${id}`);
          }, 1000);
        })
        .catch(err => {
          console.log(err);
          this.blogPublished = false;
        });
    },
    onDeleteBlog() {
      const { id } = this.$route.params;
      deleteBlog(id)
        .then(() => {
          window.scrollTo(0, 0);
          this.blogDeleted = true;
          setTimeout(() => {
            this.$router.push('/myPublished');
          }, 1000);
        })
        .catch(() => {
          window.scrollTo(0, 0);
          this.blogDeleted = false;
        });
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
.add-title-container {
  margin: 1em auto 0 auto;
}
.blog-description-container {
  margin: 0 auto;
}
.alert-banner {
  position: absolute;
  right: 2em;
}
.entered-tags-list {
  display: flex;
  flex-wrap: wrap;
}
.tag-alert-error {
  width: 100%;
}
.btn-container {
  display: flex;
  margin: 0 auto;
  width: 45em;
}
.publish-btn,
.delete-btn,
.save-as-draft-btn {
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
</style>
