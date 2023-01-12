import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

import { ArticleNode, TREE_DATA } from 'src/app/data/content-data';

interface ArticleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent {
  treeControl = new FlatTreeControl(this._getLevel, this._isExpandable);
  treeFlattener = new MatTreeFlattener(this._transformer, this._getLevel, this._isExpandable, this._getChildren);
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  _transformer(node: ArticleNode, level: number) {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  _getLevel(node: ArticleFlatNode) {
    return node.level;
  }

  _isExpandable(node: ArticleFlatNode) {
    return node.expandable;
  }

  _getChildren(node: ArticleNode) {
    return node.children;
  }

  hasChild = (_: number, node: ArticleFlatNode) => node.expandable;
}
