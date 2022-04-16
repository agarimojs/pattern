# pattern
Build several strings from a pattern using cartesian product

## Example

It's able to build an array of strings as the cartesian product from the options described in the pattern string.
To add options in the pattern, use text between brackets and separated by |


```javascript
const { composeFromPattern } = require('@agarimo/pattern');

const input = 'I [am having|have] a [problem|question] that I have to [solve|investigate]';
const actual = composeFromPattern(input);
console.log(actual);
// [
//   'I am having a problem that I have to solve',
//   'I am having a problem that I have to investigate',
//   'I am having a question that I have to solve',
//   'I am having a question that I have to investigate',
//   'I have a problem that I have to solve',
//   'I have a problem that I have to investigate',
//   'I have a question that I have to solve',
//   'I have a question that I have to investigate'
// ]
```

## Example with corpus

It's able to build strings from patterns in a corpus like object. It will apply to the patterns found at the data array of the object, for utterances, tests and answers.

```javascript
const { composeCorpus } = require('@agarimo/pattern');

const input = {
  name: 'Corpus Pattern',
  locale: 'en-US',
  data: [
    {
      intent: 'test1',
      utterances: ['this is [great|nice|perfect]', 'this is a test'],
      tests: ['this should be [great|nice|perfect]'],
    },
    {
      intent: 'test2',
      utterances: [
        'I [am having|have] a [problem|question] that have to [solve|investigate]',
        'We should investigate',
      ],
      tests: ['Investigate this'],
      answers: [],
    },
  ],
};
const actual = composeCorpus(input);
console.log(JSON.stringify(actual, null, 2));
// {                                                             
//   "name": "Corpus Pattern",                                   
//   "locale": "en-US",                                          
//   "data": [                                                   
//     {                                                         
//       "intent": "test1",                                      
//       "utterances": [                                         
//         "this is great",                                      
//         "this is nice",                                       
//         "this is perfect",                                    
//         "this is a test"                                      
//       ],                                                      
//       "tests": [                                              
//         "this should be great",                               
//         "this should be nice",                                
//         "this should be perfect"                              
//       ]                                                       
//     },                                                        
//     {                                                         
//       "intent": "test2",                                      
//       "utterances": [                                         
//         "I am having a problem that have to solve",           
//         "I am having a problem that have to investigate",     
//         "I am having a question that have to solve",          
//         "I am having a question that have to investigate",    
//         "I have a problem that have to solve",                
//         "I have a problem that have to investigate",          
//         "I have a question that have to solve",               
//         "I have a question that have to investigate",         
//         "We should investigate"                               
//       ],                                                      
//       "tests": [                                              
//         "Investigate this"                                    
//       ],                                                      
//       "answers": []                                           
//     }                                                         
//   ]                                                           
// }                                                             
```