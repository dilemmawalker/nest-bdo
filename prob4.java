class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        ArrayList<Integer>arr=new ArrayList<>();
        int n=nums1.length;
        int m=nums2.length;
        int total=n+m;
        int a=0,b=0;
        for(int i=0;i<total;i++){
            if((b==m) || (a<n && nums1[a]<=nums2[b])){
                arr.add(nums1[a++]);
            }
            else{
                arr.add(nums2[b++]);
            }
        }
        a=0;
        double aa=0;
        if(total%2==0)
        aa=(arr.get(total/2)+arr.get(total/2-1))*1.0/2;
        else
        aa=arr.get(total/2);
        return aa;
    }
}