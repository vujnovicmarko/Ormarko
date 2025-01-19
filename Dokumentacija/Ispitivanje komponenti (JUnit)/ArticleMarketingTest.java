import org.junit.jupiter.api.*;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;

enum ArticleCategory {
    MAJICA,
    KOŠULJA,
    TRENIRKA_GORNJI_DIO,
    TRENIRKA_DONJI_DIO,
    TRAPERICE,
    CIPELE,
    TENISICE,
    ČIZME,
    ŠTIKLE,
    HALJINA,
    SUKNJA,
    JAKNA,
    KAPUT
}

class ArticleMarketing {

    private int articleId;
    private String articleMarketer;
    private String title;
    private ArticleCategory category;
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


    public byte[] getImg() {
        return img;
    }

    public void setImg(byte[] img) {
        this.img = img;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }
}

public class ArticleMarketingTest {

    ArticleMarketing article;

    @BeforeAll
    static void setUpBeforeClass(){
        System.out.println("Starting Unit tests for class ArticleMarketing");
    }

    @AfterAll
    static void tearDownAfterClass(){
        System.out.println("Finished Unit tests for class ArticleMarketing");
    }

    @BeforeEach
    void setUp(){
        article = new ArticleMarketing();
    }

    @Test
    @DisplayName("TC-10: Setting and getting ArticleMarketing variables")
    void testGetSet(){
        article.setArticleId(1);
        article.setArticleMarketer("lbulic");
        article.setTitle("T-shirt");
        article.setCategory(ArticleCategory.MAJICA);
        article.setPrice(3.22f);
        assertAll("ArticleMarketing variable states",
                () -> assertEquals(1, article.getArticleId()),
                () -> assertEquals("lbulic", article.getArticleMarketer()),
                () -> assertEquals("T-shirt", article.getTitle()),
                () -> assertEquals(ArticleCategory.MAJICA, article.getCategory()),
                () -> assertEquals(3.22f, article.getPrice())
        );
    }
}

