import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import queries from '../queries/data';

export default function D3Graph({ queryResponse }: any) {
  let { id, domainId }: any = useParams();

  useEffect(() => {
    const queriesList = queries[domainId];
    const currentQuery = queriesList.filter(
      (query: any) => parseInt(query.id) === parseInt(id)
    )[0];

    (window as any)?.d3sparql?.query(
      'https://sedmoon-sparql.crigen.myengie.com/${domainId}/query',
      `${currentQuery.query}`,
      (json: any) => {
        var config = {
          radius: 10,
          charge: -500,
          distance: 100,
          width: 1000,
          height: 750,
          selector: '#result',
        };

        (window as any)?.d3sparql.forcegraph(json, config);
      }
    );
  }, []);

  return <div id="result" />;
}
