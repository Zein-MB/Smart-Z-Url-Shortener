<!-- eslint-disable prettier/prettier -->
<script>
export default {
  name: "UrlShortener",
  data() {
    return {
      url: "",
      result: "",
      canBeCopied: false,
      copied: false,
    }
  },
  methods: {
    async shortenUrl() {
      const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(this.url)}`);
      if (response.ok) {
        const data = await response.text();
        this.result = data;
        this.canBeCopied = !this.canBeCopied;
        document.querySelector(".result input").style.color = "black";
      } else {
        this.result = "An Error Occured";
        this.canBeCopied = false;
        document.querySelector(".result input").style.color = "red";
      }
    },
    copyLink() {
      var copyText = this.result;
      navigator.clipboard
        .writeText(copyText)
        .then(() => {
          this.copied = !this.copied
          setTimeout(() => {
            this.copied = !this.copied;
          }, 3000)
        })
        .catch(() => {
          alert("something went wrong");
        });
    }
  },
};
</script>

<template>
  <div class="wrapper">
    <div class="heading">
      <lord-icon
        src="https://cdn.lordicon.com/cbigqefp.json"
        trigger="morph"
        state="morph-link"
        style="width: 200px; height: 200px"
      >
      </lord-icon>
      <h1>Smart-Z Shortener</h1>
      <p>Here you can shorten whatever url you want for infinity!</p>
    </div>
    <form action="POST">
      <div class="form-group">
        <label>Your Url:</label>
        <input type="text" placeholder="Enter a url" v-model="url" />
      </div>
      <div class="config">
        <button type="submit" @click.prevent="shortenUrl()">
          <span>Shorten</span>
          <lord-icon
            src="https://cdn.lordicon.com/vyqvtrtg.json"
            trigger="in"
            delay="1500"
            state="in-bolt"
            colors="primary:#fff"
            style="width: 30px; height: 30px"
          >
          </lord-icon>
        </button>
        <button
          type="reset"
          @click="
            () => {
              canBeCopied = false;
            }
          "
        >
          <span>Reset</span>
          <lord-icon
            src="https://cdn.lordicon.com/rsbokaso.json"
            trigger="hover"
            colors="primary:#fff"
            style="width: 30px; height: 30px"
          >
          </lord-icon>
        </button>
      </div>
      <div class="form-group result">
        <label>Shortened Link:</label>
        <div>
          <input type="text" readonly v-model="result" />
          <Transition>
            <button v-if="canBeCopied" @click.prevent="copyLink()">
              {{ copied ? "Copied!" : "Copy" }}
            </button>
          </Transition>
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
$headingColor: #00083dcf;
$textColor: rgba(0, 0, 62, 0.619);
$textMargin: 1.5rem;

.wrapper {
  text-align: center;

  .heading {
    h1 {
      font-family: headingFont;
      text-transform: uppercase;
      color: $headingColor;
    }

    p {
      margin-top: $textMargin;
      color: $textColor;
      line-height: 1.5;
    }
  }

  form {
    margin-top: 3rem;
    display: grid;
    grid-gap: $textMargin;

    & > .form-group {
      display: grid;
      grid-template-columns: minmax(200px, 1fr);
      grid-gap: 0.5rem;

      &.result {
        & > div {
          position: relative;

          & > input {
            width: 100%;
          }

          & > button {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            padding: 10px;
            border-radius: 10px;
            background-color: rgb(0, 18, 70);
            color: #fff;
            border: 1px solid #ddd;
            cursor: pointer;
            transition: 0.5s all;

            &:hover {
              background-color: rgb(177, 43, 255);
            }

            &:focus {
              outline: 3px solid rgb(56 56 196 / 27%);
              background-color: rgb(177, 43, 255);
            }

            @media (max-width: 768px) {
              display: none;
            }
          }
        }
      }

      label {
        font-size: 22px;
        text-transform: uppercase;
      }

      input {
        font-size: 22px;
        padding: 18px 29px;
        background-color: #eeeeeeb9;
        color: $headingColor;
        caret-color: $headingColor;
        border-radius: 10px;
        border: 0.5px solid #b8b8b8;
        font-family: inputFont;
        transition: 0.2s all ease-out;

        &::placeholder {
          font-weight: bold;
          font-family: inputFont;
          opacity: 0.8;
          transition: 0.1s ease;
        }

        &:focus::placeholder {
          opacity: 0;
        }

        &:focus {
          outline: 5px solid rgb(56 56 196 / 27%);
        }
      }
    }

    & > .config {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      grid-gap: $textMargin;

      button {
        padding: 15px 30px;
        border-radius: 50px;
        border: none;
        color: #fff;
        background-color: rgb(0, 18, 70);
        font-family: inputFont;
        font-size: 20px;
        letter-spacing: 1px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        cursor: pointer;
        transition: 0.2s all ease-out;

        &:hover {
          background-color: rgb(177, 43, 255);
          box-shadow: #0139615e 0 13px 42px 0px;
          transform: translateY(-5px);
        }
      }
    }
  }
}
</style>
