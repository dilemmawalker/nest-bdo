class Solution {
    public int[] productExceptSelf(int[] arr) {
        int n=arr.length;
        if(n==0 || n==1)
        return arr;
        int[]left=new int[n];
        int[]right=new int[n];
        left[0]=1;
        right[n-1]=1;
        int c=1; 
        for(int i=1;i<n;i++){
            int a=arr[i-1];
            c*=a;
            left[i]=c;
        }
        c=1;
        for(int i=n-2;i>=0;i--){
            int a=arr[i+1];
            c*=a;
            right[i]=c;
        }
        for(int i=0;i<n;i++){
            left[i]*=right[i];
        }
        return left;
    }
}