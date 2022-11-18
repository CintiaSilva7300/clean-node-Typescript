export interface HashComparer {
  compare(values: string, hash: string): Promise<boolean>;
}
