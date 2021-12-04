class Solution {
    public int numSubseq(int[] arr, int tar) {
        int n=arr.length;
        Arrays.sort(arr);
        int p1=0,p2=n-1;
        int c=0;
        while(p1<=p2){
            int a=arr[p1];
            int b=arr[p2];
            int sum=a+b;
            if(sum<=tar){
                
            }
        }
    }
}