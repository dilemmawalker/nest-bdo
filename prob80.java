class Solution {
    public int removeDuplicates(int[] arr) {
        int n=arr.length;
        int idx=0,p=0;
        while(idx<n && p<n){
            int count=findcount(arr,idx);
            if(count>=2){
                arr[p++]=arr[idx];
                arr[p++]=arr[idx];
            }
            else{
                arr[p++]=arr[idx];
            }

            idx+=count;
        }
        return p;
    }
    public int findcount(int[]arr,int idx){
        int c=0;
        int no=arr[idx];
        int n=arr.length;
        while(idx<n && arr[idx]==no){
            c++;
            idx++;
        }
        return c;
    }
}