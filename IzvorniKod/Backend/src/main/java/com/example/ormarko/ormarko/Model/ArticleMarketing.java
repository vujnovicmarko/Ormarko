package com.example.ormarko.ormarko.Model;

import jakarta.persistence.*;

@Entity
public class ArticleMarketing {

        @Id
        private int articleId;

        private String articleMarketer;
        private String title;
        @Enumerated(EnumType.STRING)
        private ArticleCategory category;
        @Column(name = "img")
        private byte[] img;
        private float price;

        // Default constructor
        public ArticleMarketing() {
        }

        // Parameterized constructor
        public ArticleMarketing(String articleMarketer, String title, ArticleCategory category, byte[] img, float price) {
                this.articleMarketer = articleMarketer;
                this.title = title;
                this.category = category;
                this.img = img;
                this.price = price;
        }

        // Getters and Setters
        public int getArticleId() {
                return articleId;
        }

        public void setArticleId(int articleId) {
                this.articleId = articleId;
        }

        public String getArticleMarketer() {
                return articleMarketer;
        }

        public void setArticleMarketer(String articleMarketer) {
                this.articleMarketer = articleMarketer;
        }

        public String getTitle() {
                return title;
        }

        public void setTitle(String title) {
                this.title = title;
        }

        public ArticleCategory getCategory() {
                return category;
        }

        public void setCategory(ArticleCategory category) {
                this.category = category;
        }

        public byte[] getimg() {
                return img;
        }

        public void setimg(byte[] img) {
                this.img = img;
        }

        public float getPrice() {
                return price;
        }

        public void setPrice(float price) {
                this.price = price;
        }
}
