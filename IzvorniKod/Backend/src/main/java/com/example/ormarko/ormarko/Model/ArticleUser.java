package com.example.ormarko.ormarko.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "\"articles_user\"")
public class ArticleUser {

        @Id
        private int articleId;

        private int locationId;

        private boolean sharing;

        private String title;

        //@Lob // For larger binary data
        @Column(name = "img")
        private byte[] img;

        @Enumerated(EnumType.STRING)
        private ArticleCategory category;

        @Enumerated(EnumType.STRING)
        private ArticleSeason season;

        @Column(name = "openess")
        @Enumerated(EnumType.STRING)
        private ArticleOpen openness;

        @Enumerated(EnumType.STRING)
        private ArticleCasual howCasual;

        @Enumerated(EnumType.STRING)
        private ArticleColor mainColor;

        @Enumerated(EnumType.STRING)
        private ArticleColor sideColor;

        private String descript;

        // Default constructor
        public ArticleUser() {
        }

        // Parameterized constructor
        public ArticleUser(int locationId, boolean sharing, String title, byte[] img,
                           ArticleCategory category, ArticleSeason season, ArticleOpen openess,
                           ArticleCasual howCasual, ArticleColor mainColor, ArticleColor sideColor,
                           String descript) {
                this.locationId = locationId;
                this.sharing = sharing;
                this.title = title;
                this.img = img;
                this.category = category;
                this.season = season;
                this.openness = openess;
                this.howCasual = howCasual;
                this.mainColor = mainColor;
                this.sideColor = sideColor;
                this.descript = descript;
        }

        public int getArticleId() {
                return articleId;
        }

        public void setArticleId(int articleId) {
                this.articleId = articleId;
        }

        public int getLocationId() {
                return locationId;
        }

        public void setLocationId(int locationId) {
                this.locationId = locationId;
        }

        public boolean isSharing() {
                return sharing;
        }

        public void setSharing(boolean sharing) {
                this.sharing = sharing;
        }

        public String getTitle() {
                return title;
        }

        public void setTitle(String title) {
                this.title = title;
        }

        public byte[] getimg() {
                return img;
        }

        public void setimg(byte[] img) {
                this.img = img;
        }

        public ArticleCategory getCategory() {
                return category;
        }

        public void setCategory(ArticleCategory category) {
                this.category = category;
        }

        public ArticleSeason getSeason() {
                return season;
        }

        public void setSeason(ArticleSeason season) {
                this.season = season;
        }

        public ArticleOpen getOpenness() {
                return openness;
        }

        public void setOpenness(ArticleOpen openess) {
                this.openness = openess;
        }

        public ArticleCasual getHowCasual() {
                return howCasual;
        }

        public void setHowCasual(ArticleCasual howCasual) {
                this.howCasual = howCasual;
        }

        public ArticleColor getMainColor() {
                return mainColor;
        }

        public void setMainColor(ArticleColor mainColor) {
                this.mainColor = mainColor;
        }

        public ArticleColor getSideColor() {
                return sideColor;
        }

        public void setSideColor(ArticleColor sideColor) {
                this.sideColor = sideColor;
        }

        public String getdescript() {
                return descript;
        }

        public void setdescript(String descript) {
                this.descript = descript;
        }
}


