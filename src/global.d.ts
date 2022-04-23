// This file will add both p5 instanced and global intellisense
import * as p5Global from 'p5/global';
// This is re-exporting the module for instance mode
import module = require('p5');
export = module;
export as namespace p5;