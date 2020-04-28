<template>
  <v-content>
    <Header />
    <div class="add-blog-container">
      <v-alert
        class="alert-banner-add-blog"
        width="300"
        v-if="blogPublished === true"
        type="success"
      >
        Blog successfully published!
      </v-alert>
      <v-alert
        class="alert-banner-add-blog"
        width="300"
        v-if="blogPublished === false"
        type="error"
      >
        Failed to publish blog! Please check the entered details.
      </v-alert>
      <v-alert
        class="alert-banner-add-blog"
        width="300"
        v-if="blogUpdated === true"
        type="success"
      >
        Blog successfully updated!
      </v-alert>
      <v-alert
        class="alert-banner-add-blog"
        width="300"
        v-if="blogUpdated === false"
        type="error"
      >
        Failed to update blog! Please check the entered details.
      </v-alert>
      <v-alert
        class="alert-banner-add-blog"
        width="300"
        v-if="blogDeleted === true"
        type="success"
      >
        Blog successfully deleted!
      </v-alert>
      <v-alert
        class="alert-banner-add-blog"
        width="300"
        v-if="blogDeleted === false"
        type="error"
      >
        Failed to delete blog!
      </v-alert>
      <v-alert
        class="alert-banner-add-blog"
        width="300"
        v-if="draftCreated === true"
        type="success"
      >
        Draft successfully created!
      </v-alert>
      <v-alert
        class="alert-banner-add-blog"
        width="300"
        v-if="draftCreated === false"
        type="error"
      >
        Failed to create draft! Please check the entered details.
      </v-alert>
      <v-alert
        class="alert-banner-add-blog"
        width="300"
        v-if="draftUpdated === true"
        type="success"
      >
        Draft successfully updated!
      </v-alert>
      <v-alert
        class="alert-banner-add-blog"
        width="300"
        v-if="draftUpdated === false"
        type="error"
      >
        Failed to update draft! Please check the entered details.
      </v-alert>
      <v-alert
        class="alert-banner-add-blog"
        width="300"
        v-if="draftDeleted === true"
        type="success"
      >
        Draft successfully deleted!
      </v-alert>
      <v-alert
        class="alert-banner-add-blog"
        width="300"
        v-if="draftDeleted === false"
        type="error"
      >
        Failed to delete draft!
      </v-alert>

      <v-form class="add-blog-form-wrapper" ref="form">
        <v-col class="add-title-container" cols="12" sm="6">
          <v-textarea
            ref="addBlogTitle"
            auto-grow
            maxlength="150"
            class="customTextField blog-title"
            type="text"
            :rules="[titleRules]"
            solo
            label="Title"
            v-model="title"
          ></v-textarea>
        </v-col>
        <v-col class="blog-image-details-container" cols="12" sm="6">
          <template>
            <div
              v-if="hideImageUploadBox === false"
              v-ripple
              class="image-upload-container"
            >
              <v-btn icon>
                <v-icon>mdi-camera-outline</v-icon>
              </v-btn>

              <p class="image-upload-container-content">ADD IMAGE</p>
            </div>
          </template>
          <v-file-input
            class="customFileInput blog-file-input"
            solo
            :rules="[fileRules]"
            @change="onImageUpload"
            v-model="file"
            accept="image/*"
            :loading="isLoading"
          >
          </v-file-input>
          <div v-if="imageUploaded" class="uploaded-image-container">
            <div
              :style="{ backgroundImage: `url(${uploadedPic})` }"
              class="uploaded-image"
            ></div>
            <v-btn @click="removeImage" class="remove-image-btn" icon>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-col>
        <v-col class="blog-description-container" cols="12" sm="6">
          <v-textarea
            minlength="50"
            solo
            :rules="[descriptionRules]"
            auto-grow
            class="customTextField blog-description"
            type="text"
            label="Start your story..."
            v-model="details"
          ></v-textarea>
        </v-col>

        <v-col class="tag-details-container" cols="12" sm="6">
          <v-text-field
            autocomplete="off"
            :rules="[tagNamesRules]"
            v-model="tag"
            v-on:keydown.enter.prevent="submitTags"
            label="Add a tag name and hit Enter"
            class="customTextField blog-tags"
            min="1"
            solo
          >
          </v-text-field>
          <v-alert
            class="tag-alert-error"
            v-if="tagExists === true"
            type="error"
          >
            Tag already exists! Please enter another tag name.
          </v-alert>
        </v-col>

        <div class="entered-tags-list">
          <v-chip
            close
            ripple
            label
            @click="removeTag(singleTag.id)"
            v-for="singleTag in tagNames"
            :key="singleTag.id"
            class="tag-description ma-2"
          >
            {{ singleTag.tag }}
          </v-chip>
        </div>
        <div class="btn-container col-sm-6 col-12">
          <v-btn
            outlined
            v-if="mode === 'create'"
            v-on:click="publishPost"
            class="publish-btn"
          >
            Publish
          </v-btn>
          <v-btn
            v-if="mode === 'edit' && previousComponent !== 'MyDraftsDetails'"
            @click="onUpdateBlog"
            class="update-blog-btn"
            outlined
          >
            Update
          </v-btn>
          <v-btn
            outlined
            v-if="mode === 'edit' && previousComponent === 'MyDraftsDetails'"
            v-on:click="onUpdateBlog"
            class="publish-btn"
          >
            Publish
          </v-btn>
          <v-btn
            v-if="mode === 'edit' && previousComponent === 'MyDraftsDetails'"
            @click="onUpdateDraft"
            class="save-as-draft-btn"
            outlined
          >
            Update Draft
          </v-btn>

          <v-btn
            @click="onDelete"
            v-if="mode === 'edit' && previousComponent !== 'MyDraftsDetails'"
            class="delete-blog-btn"
            outlined
          >
            Delete
          </v-btn>

          <v-btn
            @click="onDelete"
            v-if="mode === 'edit' && previousComponent === 'MyDraftsDetails'"
            class="delete-blog-btn"
            outlined
          >
            Delete Draft
          </v-btn>

          <v-btn
            v-if="mode === 'create'"
            v-on:click="saveAsDraft"
            class="save-as-draft-btn"
            outlined
          >
            Save As Draft
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
} from '../apis/api';
import Header from '../components/common/Header';
export default {
  name: 'AddBlog',
  components: {
    Header
  },
  data: () => ({
    file: null,
    fd: new FormData(),
    text: '',
    title: '',
    details: '',
    mode: 'create',
    pic: '',
    tagNames: [],
    tag: '',
    user: null,
    uploadedPic: '',
    blogPublished: null,
    blogUpdated: null,
    draftCreated: null,
    draftUpdated: null,
    draftDeleted: null,
    blogDeleted: null,
    imageUploaded: false,
    imageUpdated: false,
    isLoading: false,
    tagExists: false,
    published: null,
    hideImageUploadBox: false,
    previousComponent: ''
  }),
  mounted() {
    this.$refs.addBlogTitle.focus();
    const { prevComponent } = this.$route.query;
    this.previousComponent = prevComponent;
    if (this.$route.params.id) {
      this.mode = 'edit';
      this.hideImageUploadBox = true;
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
  computed: {
    titleRules() {
      if (!this.title) {
        return 'Title cannot be empty!';
      } else if (this.title.length < 10) {
        return 'Title must be atleast 10 characters!';
      } else {
        return '';
      }
    },
    descriptionRules() {
      if (!this.details) {
        return 'Description cannot be empty!';
      } else if (this.details.length < 50) {
        return 'Description must be atleast 50 characters!';
      } else {
        return '';
      }
    },
    fileRules() {
      if (!this.uploadedPic) {
        return 'Please upload an image!';
      } else {
        return '';
      }
    },
    tagNamesRules() {
      const { id } = this.$route.params;

      if (id) {
        if (this.tag === '' && this.tagNames.length === 0) {
          return 'Please enter atleast one tag';
        } else {
          return '';
        }
      } else if (!this.tag && this.tagNames.length === 0) {
        return 'Tag name cannot be empty!';
      } else {
        return '';
      }
    }
  },
  methods: {
    onImageUpload() {
      this.isLoading = true;
      if (this.file) {
        this.fd.append('pic', this.file, this.file.name);

        imageUpload(this.fd).then(res => {
          this.uploadedPic = res.data.pic;
          this.pic = res.data.id;
          this.isLoading = false;
          this.hideImageUploadBox = true;
          this.imageUploaded = true;
        });
      } else {
        this.imageUploaded = false;
        this.hideImageUploadBox = false;
        this.isLoading = false;
      }
    },
    submitTags() {
      if (this.tag !== '') {
        const data = {
          tag: this.tag
        };
        addTags(data)
          .then(res => {
            this.tagId = res.data.id;
            this.tagNames.push(res.data);
            // this.tagIds.push(this.tagId);
            this.tag = '';
            this.tagExists = false;
          })
          .catch(() => {
            this.tagExists = true;
            this.tag = '';
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
            window.scrollTo(0, 0);
            this.blogPublished = true;
            setTimeout(() => {
              this.$router.push('/myPublished');
            }, 1000);
          })
          .catch(err => {
            window.scrollTo(0, 0);
            console.log(err);
            this.blogPublished = false;
          });
      }
    },
    saveAsDraft() {
      this.$refs.form.validate();
      if (
        this.title !== '' &&
        this.details !== '' &&
        this.pic !== '' &&
        this.tags !== ''
      ) {
        const tagIds = this.tagNames.map(el => el.id);
        this.published = false;
        const data = {
          title: this.title,
          details: this.details,
          pic: this.pic,
          tags: tagIds,
          published: this.published
        };
        createBlog(data)
          .then(() => {
            window.scrollTo(0, 0);
            this.draftCreated = true;
            setTimeout(() => {
              this.$router.push('/myDrafts');
            }, 1500);
          })
          .catch(err => {
            window.scrollTo(0, 0);
            console.log(err);
            this.draftCreated = false;
          });
      }
    },
    removeTag(id) {
      this.tagNames = this.tagNames.filter(el => el.id !== id);
    },
    removeImage() {
      this.imageUploaded = false;
      this.hideImageUploadBox = false;
      this.uploadedPic = '';
      this.pic = 0;
    },
    onUpdateDraft() {
      const { id } = this.$route.params;
      this.$refs.form.validate();
      const tagIds = JSON.parse(JSON.stringify(this.tagNames.map(el => el.id)));

      this.published = false;

      const data = {
        title: this.title,
        details: this.details,
        pic: this.pic,
        tags: tagIds,
        user: this.user,
        published: this.published
      };
      updateBlog(id, data)
        .then(() => {
          window.scrollTo(0, 0);
          this.draftUpdated = true;
          setTimeout(() => {
            this.$router.push(`/myDrafts/${id}`);
          }, 1500);
        })
        .catch(err => {
          window.scrollTo(0, 0);
          console.log(err);
          this.draftUpdated = false;
        });
    },
    onUpdateBlog() {
      const { id } = this.$route.params;
      this.$refs.form.validate();
      const tagIds = JSON.parse(JSON.stringify(this.tagNames.map(el => el.id)));

      this.published = true;

      const data = {
        title: this.title,
        details: this.details,
        pic: this.pic,
        tags: tagIds,
        user: this.user,
        published: this.published
      };
      updateBlog(id, data)
        .then(() => {
          window.scrollTo(0, 0);
          this.blogUpdated = true;
          setTimeout(() => {
            this.$router.push(`/myPublished/${id}`);
          }, 1500);
        })
        .catch(err => {
          window.scrollTo(0, 0);
          console.log(err);
          this.blogUpdated = false;
        });
    },
    onDelete() {
      const { id } = this.$route.params;
      const { previousComponent } = this;
      deleteBlog(id)
        .then(() => {
          window.scrollTo(0, 0);
          if (
            previousComponent === 'BlogDetails' ||
            previousComponent === 'PublishedDetails'
          ) {
            this.blogDeleted = true;
            setTimeout(() => {
              this.$router.push('/myPublished');
            }, 1000);
          } else if (previousComponent === 'MyDraftsDetails') {
            this.draftedDeleted = true;
            setTimeout(() => {
              this.$router.push('/myDrafts');
            }, 1500);
          }
        })
        .catch(err => {
          console.log(err);
          window.scrollTo(0, 0);
          if (
            previousComponent === 'BlogDetails' ||
            previousComponent === 'PublishedDetails'
          ) {
            this.blogDeleted = false;
          } else if (previousComponent === 'MyDraftsDetails') {
            this.draftedDeleted = false;
          }
        });
    }
  }
};
</script>

<style lang="scss">
.add-blog-container {
  position: relative;
  top: 5em;
  margin-bottom: 5em;
}
.add-blog-form-wrapper {
  position: relative;
  top: 4em;
}
.image-upload-container {
  position: relative;
  padding: 2em 0;
  top: 6em;
  border: 2px dashed #b3b3b1;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.remove-image-btn {
  margin-left: 2em;
}
.image-upload-container-content {
  font-size: 1.4em;
  color: #b3b3b1;
  font-weight: 700;
}
.customTextField {
  caret-color: #b3b3b1 !important;
}
.blog-title label {
  font-size: 2em;
  font-weight: 400;
  word-spacing: -2px;
  overflow: visible !important;
  text-align: justify;
  font-family: 'Roboto', serif;
  color: #b3b3b1 !important;
}

.blog-file-input label,
.blog-description label,
.blog-tags label {
  font-size: 1.2em;
  font-weight: 400;
  word-spacing: -2px;
  overflow: visible !important;
  text-align: justify;
  font-family: 'Roboto', serif;
  color: #b3b3b1 !important;
}

.blog-file-input label {
  left: -0.5em !important;
}

.blog-file-input .v-text-field__slot {
  bottom: 0.5em;
  height: 7em;
  position: relative;
}

.blog-title textarea {
  font-size: 2.2em;
  font-family: 'PT Serif', serif;
  line-height: 48px;
  font-weight: 400;
  word-spacing: -2px;
  text-align: justify;
  color: rgba(0, 0, 0, 0.84);
}
.blog-description {
  width: 68em;
  margin-left: -1em !important;
  margin-top: 3em !important;
}
.blog-tags {
  width: 68em;
  margin-left: -1em !important;
}
.blog-description textarea {
  line-height: 33px;
  font-size: 1.17em;
  font-family: 'PT Serif', serif;
  width: 680px;
  word-spacing: -1.8px;
  overflow-wrap: break-word;
  letter-spacing: 0.2px;
  text-align: justify;
  color: rgba(0, 0, 0, 0.84);
}
.customTextField .v-input__slot,
.customFileInput .v-input__slot {
  background: none !important;
  box-shadow: none !important;
}

.blog-image-details-container .v-input {
  position: relative;
  bottom: 5.4em;
  padding: 2em 0;
}

.add-title-container {
  margin: 1em auto 0 auto;
}

.blog-image-details-container {
  margin: -8em auto 0 auto;
  width: 68em;
}
.blog-description-container {
  margin: -17em auto 8em auto;
  width: 68em;
}
.tag-details-container {
  width: 68em;
  margin: -10em auto 0 auto;
}
.alert-banner-add-blog {
  position: absolute;
  right: 2em;
  top: 2em;
}
.entered-tags-list {
  display: flex;
  width: 68em;
  flex-wrap: wrap;
  margin: 0 auto;
}
.tag-description {
  font-size: 1.35em;
  font-family: 'Roboto', serif;
  line-height: 22px;
  margin-top: 1.5em !important;
  position: relative;
  left: -0.5em;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.54) !important;
  background: #f2f2f2 !important;
}
.tag-alert-error {
  width: 100%;
}
.btn-container {
  margin: 2em auto 0 auto;
  width: 68em;
}
.publish-btn {
  margin-left: -1em;
  font-family: 'Roboto', serif;
  width: 6em;
  margin-bottom: 2em;
  background: #1976d2;
  color: white !important;
  text-transform: capitalize;
  font-size: 1.4em;
  font-weight: 400;
}
.update-blog-btn {
  margin-left: -1em;
  margin-right: 0.5em;
  font-family: 'Roboto', serif;
  margin-bottom: 2em;
  background: #4ca97c;
  color: white !important;
  text-transform: capitalize;
  font-size: 1.4em;
  font-weight: 400;
}
.delete-blog-btn {
  font-family: 'Roboto', serif;
  margin-bottom: 2em;
  background: #ff5252;
  color: white !important;
  text-transform: capitalize;
  font-size: 1.4em;
  font-weight: 400;
}
.save-as-draft-btn {
  font-family: 'Roboto', serif;
  margin-bottom: 2em;
  background: #4ca97c;
  color: white !important;
  text-transform: capitalize;
  font-size: 1.4em;
  font-weight: 400;
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
  width: 73em;
  height: 45em;
  display: flex;
  margin-top: -13em;
  margin-bottom: 13em;
}
.uploaded-image {
  width: 68em;
  height: 45em;
  margin-bottom: 4em;
  background-size: cover;
}
.v-file-input__text {
  display: none !important;
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
