import { sql } from '@codemirror/lang-sql';

import CodeMirror from '@uiw/react-codemirror';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TabList from '../components/TabList';

import queries from '../queries/data';

export default function EditorPage() {
  let { id, domainId }: any = useParams();
  const [currentQuery, setCurrentQuery] = useState<any>(null);
  const [currentFormat, setCurrentFormat] = useState<string>('json');
  const [editorQueryValue, setEditorQueryValue] = useState<any>('');
  const [queryResponse, setQueryResponse] = useState<any>();
  const [error, setError] = useState<any>('');

  useEffect(() => {
    const queriesList = queries[domainId];
    const currentQuery = queriesList.filter(
      (query: any) => parseInt(query.id) === parseInt(id)
    )[0];
    setCurrentQuery(currentQuery);
    setQueryResponse('');
    setError('');
  }, [id, setCurrentQuery]);

  const onChange = useCallback((value: any, viewUpdate: any) => {
    setEditorQueryValue(value);
  }, []);

  const handleQueryChange = async () => {
    try {
      let result: any = await fetch(
        `https://sedmoon-sparql.crigen.myengie.com/${domainId}/query?query=${encodeURIComponent(
          editorQueryValue || currentQuery?.query
        )}&format=${encodeURIComponent(currentFormat)}`
      );
      switch (currentFormat) {
        case 'json':
          result = await result.json();
          break;
        default:
          result = await result.text();
          break;
      }
      setQueryResponse(result);
    } catch (error: any) {
      setError(error?.message || error);
    }
  };

  const handleDownloadResult = async () => {
    console.log(queryResponse);
  };

  return (
    <div>
      <div className="flex flex-col items-start space-y-6 px-4">
        <h2 className="text-xl font-semibold text-gray-600 underline">
          {currentQuery?.title}
        </h2>
        <div className="mt-4 pl-3">
          {currentQuery?.tags?.split(',').map((tag: any, index: number) => (
            <span
              key={`tags-${index + 1}`}
              className="ml-2 mb-2 rounded-full bg-purple-50 px-2 py-1 text-sm tracking-wider ring-1 ring-purple-400"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="w-full">
          <CodeMirror
            value={currentQuery?.query}
            height="300px"
            extensions={[sql()]}
            onChange={onChange}
          />
        </div>
        <div>
          <div
            style={{
              backgroundColor: '#f7f7f7',
            }}
            data-step="5"
            data-intro="or download directly your results in the format of your choice"
          >
            <label className="n">Results Format</label>
            <select
              value={currentFormat}
              name="format"
              id="format"
              onChange={(e: any) => {
                setCurrentFormat(e.target.value);
              }}
            >
              <option value="auto">Auto</option>
              <option value="application/sparql-results+xml">
                XML (select)
              </option>
              <option value="json">JSON (select)</option>
              <option value="application/sparql-results+json">
                JSON-LD (construct)
              </option>
              <option value="application/turtle">Turtle (construct)</option>
              <option value="rdf+xml" selected={true}>
                {' '}
                RDF/XML (construct)
              </option>
              <option value="application/n-triples">
                N-Triple (construct)
              </option>
              <option value="application/x-trig">Trig (construct)</option>
              <option value="text/csv">CSV (select)</option>
              <option value="text/tab-separated-values">TSV (select)</option>
            </select>

            <button
              style={{ marginLeft: '20px' }}
              onClick={handleQueryChange}
              className="rounded bg-purple-300 px-4 py-2 shadow-sm hover:shadow-lg"
            >
              Execute Query
            </button>
            <button
              style={{ marginLeft: '20px' }}
              onClick={handleDownloadResult}
              className="rounded bg-pink-300 px-4 py-2 shadow-sm hover:shadow-lg"
            >
              {' '}
              &nbsp; Download Results
            </button>
          </div>
        </div>
        <TabList queryResponse={queryResponse} error={error} />
      </div>
    </div>
  );
}
