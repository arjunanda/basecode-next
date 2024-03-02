export const parseErrorArray = (data: { [key: string]: [string] } | null) => {
  if (data) {
    const result: Array<string> = [];
    const arrayData = Object.values(data);

    arrayData.map((v) => {
      result.push(v[0]);
    });

    return result[0] as unknown as "";
  }

  return null;
};
