export const Chunker= (array,chunkSize)=>{

    let i,j,temparray=[];

    for (i=0,j=array.length; i<j; i+=chunkSize) {
        temparray.push(array.slice(i,i+chunkSize));
    }
    return temparray;
}
