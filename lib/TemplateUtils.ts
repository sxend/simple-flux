import nano from './nano';

export module TemplateUtils {
  export function compile(template: string, data: any): string {
    return nano(template, data);
  }
}
