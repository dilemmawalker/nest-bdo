export enum FieldDataType {
  String = 'string',
  Number = 'number',
  Boolean = 'boolean',
  Document = 'document',
  Image = 'image',
}

export const reservedKeywordsForField = [
  'agent_name',
  'agent_id',
  '_id',
  'group',
  'expression',
  'label',
  'position',
  'createdat',
  'updatedat',
  'iseditable',
  'isexportable',
  'keyname',
  'inputvalue',
];
