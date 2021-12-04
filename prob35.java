class Solution {
    public int searchInsert(int[] nums, int target) {
        return bs(nums,target,0,nums.length-1);
    }
    public int bs(int[]arr,int tar,int s,int e){
        int mid=(s+e)/2;
        if(s>e)
            return s;
        if(arr[mid]==tar)
            return mid;
        
        if(arr[mid]<tar){
         return   bs(arr,tar,mid+1,e);
        }
        else{
          return  bs(arr,tar,s,mid-1);
        }
        
    }
}