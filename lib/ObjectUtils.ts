export module ObjectUtils {
  export function merge(objects: any[]) {
    return Object['assign'].apply(Object, objects);
  }
}
