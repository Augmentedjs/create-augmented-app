import { Article as BaseArticle } from "presentation-components";

class Article extends BaseArticle {
  constructor() {
    super({
      "id": "app",
      "name": "article",
      "style": "article",
      "header": "<i></i>",
      "headerStyle": "header",
      "headerEl": "header",
      "body": ""
    });
    // This is where body content will go
    this.addSection({ "id": "main", "class": "main" });
    // for the dialogs
    this.addSection({ "id": "dialogs", "class": "dialogs" });
  };
};

export default Article;
