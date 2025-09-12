'use client';

import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Loading from '@/components/Loading';
import { X, Eye, EyeOff } from 'lucide-react';

export default function CSVPreview({ file, onClose }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [headers, setHeaders] = useState([]);

  const displayedData = showAll ? data : data.slice(0, 10);

  async function fetchCSV() {
    try {
      setLoading(true);
      setError('');
      //console.log('Fetching CSV for file:', file);

      const res = await fetch(`/api/view?id=${file.fileId}`);
      //console.log('API Status:', res.status);

      if (!res.ok) {
        const errorText = await res.text();
        console.error('API Error Response:', errorText);
        throw new Error(`Failed to fetch CSV file: ${res.status} ${errorText}`);
      }

      const text = await res.text();
      //console.log('CSV Response (first 200 chars):', text.slice(0, 200));

      if (!text.trim()) {
        throw new Error('Empty CSV file');
      }

      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        delimiter: ',',
        complete: (results) => {
          //console.log('Parsed CSV:', results);

          if (results.errors && results.errors.length > 0) {
            setError(`Parsing error: ${results.errors[0].message}`);
          } else if (!results.data || results.data.length === 0) {
            setError('No data found in CSV file or file is empty.');
          } else {
            setData(results.data);
            setHeaders(Object.keys(results.data[0]));
          }
          setLoading(false);
        },
        error: (err) => {
          console.error('PapaParse Error:', err);
          setError(`CSV parsing failed: ${err.message}`);
          setLoading(false);
        },
      });
    } catch (err) {
      console.error('Error loading CSV:', err);
      setError(`Failed to load CSV file: ${err.message}`);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (file?.fileId) {
      fetchCSV();
    }
  }, [file?.fileId]);

  if (loading) {
    return (
      <Card className="mx-auto mt-5 w-full max-w-6xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>CSV Preview</CardTitle>
            <CardDescription>Loading {file.fileName}</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loading text="Loading CSV data..." />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mx-auto w-full max-w-6xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>CSV Preview</CardTitle>
            <CardDescription>{file.fileName}</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="bg-destructive/15 text-destructive rounded-lg p-4">⚠️ {error}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-auto max-w-6xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle>CSV Preview</CardTitle>
          <CardDescription>
            {file.originalName} • {data.length} rows • {headers.length} columns
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          {data.length > 10 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 text-gray-800"
            >
              {showAll ? (
                <>
                  <EyeOff className="h-4 w-4" />
                  Show Less
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" />
                  View All
                </>
              )}
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="bg-card overflow-auto rounded-lg border">
          {data.length > 0 ? (
            <div className="relative max-h-96 overflow-auto">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-muted/50 sticky top-0 backdrop-blur-sm">
                  <tr>
                    {headers.map((key) => (
                      <th
                        key={key}
                        className="border-border border px-4 py-3 text-left font-medium text-foreground dark:text-white"
                      >
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {displayedData.map((row, index) => (
                    <tr
                      key={index}
                      className="border-border hover:bg-muted/30 border-b transition-colors"
                    >
                      {Object.values(row).map((value, i) => (
                        <td
                          key={i}
                          className="border-border border px-4 py-2 text-foreground dark:text-white"
                        >
                          {value || (
                            <span className="text-muted-foreground dark:text-gray-300">-</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-muted-foreground flex items-center justify-center py-8">
              No data to display
            </div>
          )}

          {data.length > 10 && (
            <div className="border-border mt-4 flex items-center justify-between border-t pt-4">
              <p className="text-muted-foreground text-sm">
                Showing {displayedData.length} of {data.length} rows
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAll(!showAll)}
                className="flex items-center gap-2 text-gray-800"
              >
                {showAll ? (
                  <>
                    <EyeOff className="h-4 w-4" />
                    Show Less
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4" />
                    View All ({data.length} rows)
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
