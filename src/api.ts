const compareVersions: any = require("compare-versions");

interface Response {
  status: number;
  statusText: string;
  json(): any;
}

const endpoint = "https://api.github.com";

function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(response.statusText);
  }
}

function orderVersions(versions: string[]): string[] {
  const normalVersions: string[] = [];
  const nextVersions: string[] = [];
  versions.forEach((version) => {
    if (version.match(/^\d+\.\d+\.\d+$/) || version.includes("-rc.")) {
      normalVersions.push(version);
    } else {
      nextVersions.push(version);
    }
  });

  return [
    ...normalVersions.sort((a: string, b: string) => -compareVersions(a, b)),
    ...nextVersions.sort((a: string, b: string) => -compareVersions(a, b)),
  ];
}

export function fetchVersions(repo: string) {
  // We use github versions
  return fetch(`${endpoint}/repos/${repo}/tags?per_page=100`)
    .then(checkStatus)
    .then((response: Response) => response.json())
    .then((releases) => releases.filter((r: any) => !r.prerelease))
    .then((releases) => releases.map((r: any) => r.tag_name))
    .then((versions) => orderVersions(versions))
    .catch((err) => {
      console.warn(err);
      return [];
    });
}
