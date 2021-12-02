class Solution {
    public int removeDuplicates(int[] arr) {
        int n=arr.length;
        if(n==0)
            return 0;
        int c=1;
        for(int i=1;i<n;i++){
            int b=arr[i];
            int a=arr[i-1];
            if(b!=a){
                arr[c]=b;
            c++;
            }
        }
        return c;
    }
}