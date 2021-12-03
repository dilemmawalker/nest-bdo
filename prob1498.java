class Solution {
    public int numSubseq(int[] arr, int target) {
        return sol(arr,0,target,0,arr.length,-1,10000000);
    }
    public int sol(int[]arr,int sum,int tar,int idx,int n,int max,int min){

        if(idx==n){
            if(min+max<=tar)
            return 1;
            return 0;
        }

        int res=0;
        int tmin=min,tmax=max;
        min=Math.min(min,arr[idx]);
        max=Math.max(max,arr[idx]);
        res+=sol(arr,sum+arr[idx],tar,idx+1,n,max,min);
        min=tmin;
        max=tmax;
        res+=sol(arr,sum,tar,idx+1,n,max,min);

        return res;
    }
}