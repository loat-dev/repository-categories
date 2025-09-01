import { assertObjectMatch, assertThrows } from "@std/assert";
import { RawContents } from './raw_contents.ts';
import { read } from './read.ts';
import * as errors from './errors/index.ts';

const testData : Record<string, RawContents> = {
  'path/to/file.json': {
    categories: {
      '': 'Default'
    },
    labelSearchPattern: 'dummySearchPattern',
    onlyPublicRepositories: true,
    repositoryBlacklist: [
      'foo',
      'bar'
    ],
    templateFiles: {
      category: 'path/to/category.md',
      readme: 'path/to/readme.md',
      repository: 'path/to/repository.md'
    }
  }
}

Deno.test('Tests the read function.', async (test) => {
  await test.step({
    name: 'Tests if the read function converts the read input correctly to the JSON object.',
    fn() : void {
      assertObjectMatch(
        read(
          'path/to/file.json',
          (path) => JSON.stringify(testData[path.toString()])
        ),
        {...testData['path/to/file.json']}
      )
    }
  })

  await test.step({
    name: 'Tests if the read function throws on error.',
    fn() : void {
      assertThrows(
        () => read(
          'path/to/file.json',
          (path) => JSON.stringify(testData[path.toString()]) + '"'
        ),
        errors.ConfigFileParsingError
      )
    }
  })
})
