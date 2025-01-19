import org.junit.jupiter.api.*;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;

enum ArticleCasual {
    ZA_DOMA,
    SPORTSKO,
    LEŽERNO,
    RADNO,
    SVEČANO
}

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

enum ArticleColor {
    BIJELA,
    SIVA,
    CRNA,
    CRVENA,
    PLAVA,
    ŽUTA,
    ZELENA,
    LJUBIČASTA,
    NARANČASTA,
    SMEĐA,
    ROZA,
    BEŽ
}

enum ArticleOpen {
    OTVORENO,
    ZATVORENO,
    KIŠA_SNIJEG
}

enum ArticleSeason {
    PROLJEĆE,
    LJETO,
    JESEN,
    ZIMA
}

class ArticleUser {

    private Integer articleId;
    private int locationId;
    private boolean sharing;
    private String title;
    private byte[] img;
    private ArticleCategory category;
    private ArticleSeason season;
    private ArticleOpen openness;
    private ArticleCasual howCasual;
    private ArticleColor mainColor;
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

    public void setArticleId(Integer articleId) {
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

    @Override
    public String toString() {
        return "ArticleUser{" +
                "articleId=" + articleId +
                ", title='" + title + '\'' +
                ", descript='" + descript + '\'' +
                '}';
    }
}

public class ArticleUserTest {

    ArticleUser article;

    @BeforeAll
    static void setUpBeforeClass(){
        System.out.println("Starting Unit tests for class ArticleUser");
    }

    @AfterAll
    static void tearDownAfterClass(){
        System.out.println("Finished Unit tests for class ArticleUser");
    }

    @BeforeEach
    void setUp(){
        article = new ArticleUser();
    }

    @Test
    @DisplayName("TC-08: Setting and getting ArticleUser variables")
    void testGetSet(){
        article.setArticleId(1);
        article.setLocationId(2);
        article.setSharing(true);
        article.setTitle("T-shirt");
        article.setCategory(ArticleCategory.MAJICA);
        article.setSeason(ArticleSeason.LJETO);
        article.setOpenness(ArticleOpen.OTVORENO);
        article.setHowCasual(ArticleCasual.LEŽERNO);
        article.setMainColor(ArticleColor.ZELENA);
        article.setSideColor(ArticleColor.CRVENA);
        article.setdescript("T-shirt for casual wearing.");
        assertAll("ArticleUser variable states",
                () -> assertEquals(1, article.getArticleId()),
                () -> assertEquals(2, article.getLocationId()),
                () -> assertEquals(true, article.isSharing()),
                () -> assertEquals("T-shirt", article.getTitle()),
                () -> assertEquals(ArticleCategory.MAJICA, article.getCategory()),
                () -> assertEquals(ArticleSeason.LJETO, article.getSeason()),
                () -> assertEquals(ArticleOpen.OTVORENO, article.getOpenness()),
                () -> assertEquals(ArticleCasual.LEŽERNO, article.getHowCasual()),
                () -> assertEquals(ArticleColor.ZELENA, article.getMainColor()),
                () -> assertEquals(ArticleColor.CRVENA, article.getSideColor()),
                () -> assertEquals("T-shirt for casual wearing.", article.getdescript())
        );
    }

    @Test
    @DisplayName("TC-09: Printing ArticleUser object")
    void testPrint(){
        article = new ArticleUser(1, true, "T-shirt", new byte[]{1,2,3,4}, ArticleCategory.MAJICA, ArticleSeason.PROLJEĆE, ArticleOpen.OTVORENO, ArticleCasual.LEŽERNO, ArticleColor.CRNA, ArticleColor.BIJELA, "Another T-shirt.");
        article.setArticleId(2);
        assertEquals("ArticleUser{articleId=2, title='T-shirt', descript='Another T-shirt.'}", article.toString());
    }
}
