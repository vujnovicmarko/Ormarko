package com.example.ormarko.ormarko.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "articles_marketing")
public class ArticleMarketing {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int articleId;
        @Column(name = "article_marketer", nullable = false)
        private String articleMarketer;
        @Column(name = "title", nullable = false, length = 50)
        private String title;
        @Enumerated(EnumType.STRING)
        @Column(name = "category", nullable = false, length = 20)
        private ArticleCategory category;
        //@Lob
        //@Column(name = "img", columnDefinition = "BYTEA", nullable = false)
        //private byte[] img;
        @Column(name = "price", nullable = false)
        private float price;

        // Default constructor
        public ArticleMarketing() {
        }

        // Parameterized constructor
        public ArticleMarketing(String articleMarketer, String title, ArticleCategory category, byte[] img, float price) {
                this.articleMarketer = articleMarketer;
                this.title = title;
                this.category = category;
                //this.img = img;
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

        /*
        public byte[] getImg() {
                return img;
        }

        public void setImg(byte[] img) {
                this.img = img;
        }

         */

        public float getPrice() {
                return price;
        }

        public void setPrice(float price) {
                this.price = price;
        }
}
